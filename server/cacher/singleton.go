package cacher

import (
	"fmt"
	"sync"
)

var (
	instances = make(map[string]any)
	lock      sync.Mutex
)

// Get 返回某个类型 T 的全局唯一 Cacher
func Get[T any]() *Cacher[T] {
	key := typeKey[T]()

	// 快路径（无锁）
	if inst, ok := instances[key]; ok {
		return inst.(*Cacher[T])
	}

	// 加锁创建
	lock.Lock()
	defer lock.Unlock()

	// 双重检查
	if inst, ok := instances[key]; ok {
		return inst.(*Cacher[T])
	}

	c := newCacher[T]()
	instances[key] = c
	return c
}

// 泛型类型唯一 key
func typeKey[T any]() string {
	var zero *T
	return fmt.Sprintf("%T", zero)
}
