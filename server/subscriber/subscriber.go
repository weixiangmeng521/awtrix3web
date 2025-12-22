package subscriber

import (
	"log"
	"sync"
	"time"

	"github.com/cespare/xxhash/v2"
	"github.com/gorilla/websocket"
)

/*
|--------------------------------------------------------------------------
| Client (one per websocket connection)
|--------------------------------------------------------------------------
*/

type Client struct {
	conn *websocket.Conn
	send chan []byte
	done chan struct{}
	once sync.Once
}

func (c *Client) writePump() {
	for {
		select {
		case msg := <-c.send:
			if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				log.Println("ws write error:", err)
				c.Close()
				return
			}
		case <-c.done:
			return
		}
	}
}

func (c *Client) Close() {
	c.once.Do(func() {
		close(c.done)      // ✅ 只关闭 done
		_ = c.conn.Close() // websocket 关闭
	})
}

/*
|--------------------------------------------------------------------------
| Subscription
|--------------------------------------------------------------------------
*/

type Subscription struct {
	id       string
	client   *Client
	event    string
	cacheKey string
	interval time.Duration
	sendFn   func() ([]byte, error)
	stop     chan struct{}
	lastHash uint64
}

/*
|--------------------------------------------------------------------------
| Manager
|--------------------------------------------------------------------------
*/

type Manager struct {
	mu      sync.Mutex
	clients map[*websocket.Conn]*Client
	subs    map[*Client]map[string]*Subscription
}

var (
	manager     *Manager
	managerLock sync.Mutex
)

func GetManager() *Manager {
	managerLock.Lock()
	defer managerLock.Unlock()

	if manager == nil {
		manager = &Manager{
			clients: make(map[*websocket.Conn]*Client),
			subs:    make(map[*Client]map[string]*Subscription),
		}
	}
	return manager
}

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/

func (m *Manager) Subscribe(
	conn *websocket.Conn,
	subID string,
	event string,
	cacheKey string,
	interval time.Duration,
	sendFn func() ([]byte, error),
) {
	m.mu.Lock()

	client, ok := m.clients[conn]
	if !ok {
		client = &Client{
			conn: conn,
			send: make(chan []byte, 256),
			done: make(chan struct{}),
		}
		m.clients[conn] = client
		m.subs[client] = make(map[string]*Subscription)
		go client.writePump()
	}

	sub := &Subscription{
		id:       subID,
		client:   client,
		event:    event,
		cacheKey: cacheKey,
		interval: interval,
		sendFn:   sendFn,
		stop:     make(chan struct{}),
	}

	m.subs[client][subID] = sub
	m.mu.Unlock()

	go sub.run()
}

func (m *Manager) Unsubscribe(conn *websocket.Conn, subID string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	client, ok := m.clients[conn]
	if !ok {
		return
	}

	sub, ok := m.subs[client][subID]
	if !ok {
		return
	}

	close(sub.stop)
	delete(m.subs[client], subID)

	if len(m.subs[client]) == 0 {
		client.Close()
		delete(m.subs, client)
		delete(m.clients, conn)
	}
}

func (m *Manager) UnsubscribeAll(conn *websocket.Conn) {
	m.mu.Lock()
	defer m.mu.Unlock()

	client, ok := m.clients[conn]
	if !ok {
		return
	}

	for _, sub := range m.subs[client] {
		close(sub.stop)
	}

	client.Close()
	delete(m.subs, client)
	delete(m.clients, conn)
}

/*
|--------------------------------------------------------------------------
| Subscription loop
|--------------------------------------------------------------------------
*/

func (s *Subscription) run() {
	ticker := time.NewTicker(s.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			b, err := s.sendFn()
			if err != nil {
				log.Println("subscribe send error:", err)
				return
			}

			h := xxhash.Sum64(b) // 极快
			if h == s.lastHash {
				continue
			}

			s.lastHash = h

			select {
			case <-s.client.done:
				return
			case s.client.send <- b:
			default:
				log.Println("send buffer full, drop message")
			}

		case <-s.stop:
			return
		case <-s.client.done:
			return
		}
	}
}
