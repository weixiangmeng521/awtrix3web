package subscriber

import (
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

/*
|--------------------------------------------------------------------------
| Subscriber
|--------------------------------------------------------------------------
*/

type Subscription struct {
	id       string
	conn     *websocket.Conn
	event    string
	cacheKey string
	interval time.Duration
	sendFn   func() ([]byte, error)
	stop     chan struct{}
}

type Manager struct {
	mu   sync.Mutex
	subs map[*websocket.Conn]map[string]*Subscription
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
			subs: make(map[*websocket.Conn]map[string]*Subscription),
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
	sub := &Subscription{
		id:       subID,
		conn:     conn,
		event:    event,
		cacheKey: cacheKey,
		interval: interval,
		sendFn:   sendFn,
		stop:     make(chan struct{}),
	}

	m.mu.Lock()
	if _, ok := m.subs[conn]; !ok {
		m.subs[conn] = make(map[string]*Subscription)
	}
	m.subs[conn][subID] = sub
	m.mu.Unlock()

	go sub.run()
}

func (m *Manager) Unsubscribe(conn *websocket.Conn, subID string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	connSubs, ok := m.subs[conn]
	if !ok {
		return
	}

	sub, ok := connSubs[subID]
	if !ok {
		return
	}

	close(sub.stop)
	delete(connSubs, subID)

	if len(connSubs) == 0 {
		delete(m.subs, conn)
	}
}

func (m *Manager) UnsubscribeAll(conn *websocket.Conn) {
	m.mu.Lock()
	defer m.mu.Unlock()

	connSubs, ok := m.subs[conn]
	if !ok {
		return
	}

	for _, sub := range connSubs {
		close(sub.stop)
	}

	delete(m.subs, conn)
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
				_ = s.conn.Close()
				return
			}

			if err := s.conn.WriteMessage(websocket.TextMessage, b); err != nil {
				log.Println("ws write error:", err)
				_ = s.conn.Close()
				return
			}

		case <-s.stop:
			return
		}
	}
}
