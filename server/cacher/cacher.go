package cacher

import (
	"sync"
	"time"
)

type Item[T any] struct {
	Value      T
	Expiration int64
}

func (i *Item[T]) Expired() bool {
	if i.Expiration == 0 {
		return false
	}
	return time.Now().UnixMilli() > i.Expiration
}

type Cacher[T any] struct {
	mu    sync.RWMutex
	store map[string]*Item[T]
}


func newCacher[T any]() *Cacher[T] {
	return &Cacher[T]{
		store: make(map[string]*Item[T]),
	}
}

func (c *Cacher[T]) Set(key string, value T, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	var exp int64
	// ttl == 0 → 永不过期
	if ttl > 0 {
		exp = time.Now().Add(ttl).UnixMilli()
	} else {
		exp = 0
	}

	c.store[key] = &Item[T]{
		Value:      value,
		Expiration: exp,
	}
}

func (c *Cacher[T]) Get(key string) (T, bool) {
	c.mu.RLock()
	item, ok := c.store[key]
	c.mu.RUnlock()

	var zero T
	if !ok || item.Expired() {
		return zero, false
	}
	return item.Value, true
}

func (c *Cacher[T]) LoadOrCompute(
	key string,
	ttl time.Duration,
	fn func() (T, error),
) (T, error) {

	if v, ok := c.Get(key); ok {
		return v, nil
	}

	v, err := fn()
	if err != nil {
		var zero T
		return zero, err
	}

	c.Set(key, v, ttl)
	return v, nil
}
