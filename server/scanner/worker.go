package scanner

import (
	"fmt"
	"sync"
)

type Workdist struct {
	Host string
}

const (
	taskload = 255
	tasknum  = 255
)

func Task(ip string, onProcess func(string)) {
	var wg sync.WaitGroup

	tasks := make(chan Workdist, taskload)
	resultChan := make(chan Workdist, taskload)

	wg.Add(tasknum)
	//创建chan消费者worker
	for gr := 1; gr <= tasknum; gr++ {
		go worker(tasks, resultChan, &wg)
	}

	//创建chan生产者
	for i := 1; i < 256; i++ {
		host := fmt.Sprintf("%s.%d", ip, i)
		task := Workdist{
			Host: host,
		}
		tasks <- task
	}
	close(tasks)

	// 等待所有 worker 处理完
	go func() {
		wg.Wait()
		close(resultChan) // worker 完成后关闭结果通道
	}()

	// 主线程读取结果
	for res := range resultChan {
		onProcess(res.Host)
	}
}

func worker(tasks chan Workdist, resultChan chan Workdist, wg *sync.WaitGroup) {
	defer wg.Done()

	task, ok := <-tasks
	if !ok {
		return
	}
	host := task.Host
	if ping(host) {
		resultChan <- Workdist{Host: host}
	}
}
