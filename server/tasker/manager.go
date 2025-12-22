package tasker

import "sync"

var (
	managerInstance *Manager
	once            sync.Once
)

// Manager 管理多个 Tasker
type Manager struct {
	mu      sync.RWMutex
	taskers map[string]*Tasker
}

// 单例：获取全局 Manager
func GetManager() *Manager {
	once.Do(func() {
		managerInstance = &Manager{
			taskers: make(map[string]*Tasker),
		}
	})
	return managerInstance
}

// 创建或获取 Tasker（线程安全）
func (m *Manager) NewTasker(name string, workers int) *Tasker {
	m.mu.Lock()
	defer m.mu.Unlock()

	// 防止重复创建
	if t, ok := m.taskers[name]; ok {
		return t
	}

	t := newTasker(name, workers)
	m.taskers[name] = t
	return t
}

// 获取 Tasker（线程安全）
func (m *Manager) Get(name string) *Tasker {
	m.mu.RLock()
	defer m.mu.RUnlock()

	return m.taskers[name]
}

// 停止所有 Tasker（线程安全）
func (m *Manager) StopAll() {
	m.mu.RLock()
	defer m.mu.RUnlock()

	for _, t := range m.taskers {
		t.Stop()
	}
}
