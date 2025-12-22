package tasker

import (
	"context"
	"sync"
	"time"
)

type Task func()

// Tasker：独立任务执行器
type Tasker struct {
	name    string
	workers int
	tasks   chan Task
	wg      sync.WaitGroup
	ctx     context.Context
	cancel  context.CancelFunc
	stopped bool
	mu      sync.Mutex
}

func newTasker(name string, workerCount int) *Tasker {
	ctx, cancel := context.WithCancel(context.Background())

	t := &Tasker{
		name:    name,
		workers: workerCount,
		tasks:   make(chan Task, 128),
		ctx:     ctx,
		cancel:  cancel,
	}

	t.start()
	return t
}

func (t *Tasker) start() {
	for i := 0; i < t.workers; i++ {
		t.wg.Add(1)
		go func() {
			defer t.wg.Done()

			for {
				select {
				case <-t.ctx.Done():
					return
				case task, ok := <-t.tasks:
					if !ok {
						return
					}
					task()
				}
			}
		}()
	}
}

func (t *Tasker) Submit(task Task) {
	t.mu.Lock()
	defer t.mu.Unlock()

	if t.stopped {
		return
	}

	t.tasks <- task
}

func (t *Tasker) SubmitInterval(task Task, d time.Duration) {
	go func() {
		for {
			select {
			case <-t.ctx.Done():
				return
			default:
				t.Submit(task)
				time.Sleep(d)
			}
		}
	}()
}

func (t *Tasker) Stop() {
	t.mu.Lock()
	if t.stopped {
		t.mu.Unlock()
		return
	}
	t.stopped = true
	t.mu.Unlock()

	t.cancel()
	close(t.tasks)
	t.wg.Wait()
}
