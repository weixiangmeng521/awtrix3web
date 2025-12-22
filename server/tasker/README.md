
```go
manager := tasker.GetManager()

syncer := manager.NewTasker("awtrix-sync", 2)
stats := manager.NewTasker("stat-fetch", 1)

syncer.Submit(func() { fmt.Println("do sync") })
stats.Submit(func() { fmt.Println("fetch stats") })

manager.StopAll()
```