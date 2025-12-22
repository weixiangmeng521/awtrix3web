package ws_events

import (
	"awtrix3web/cacher"
	"awtrix3web/constants"
	"awtrix3web/controller"
	"awtrix3web/http_clinet/awtrix_api"
	"awtrix3web/subscriber"
	"awtrix3web/tasker"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var (
	PushMessagePeriod = 300 * time.Millisecond
)

func startTaskManager(ip string) {
	client := awtrix_api.New(ip)
	if client == nil {
		log.Println("Invalid device ip, cannot create tasker")
		return
	}
	manager := tasker.GetManager()
	syncer := manager.NewTasker("awtrix-sync", 1)
	syncer.SubmitInterval(func() {
		client.SyncAwtrixSettingsTask()
		client.SyncAwtrixStatsTask()
	}, 1000)
}

func stopTaskManager() {
	manager := tasker.GetManager()
	manager.StopAll()
}

/**
 * 设置 awtrix client ip
 */
func SetAwtrixDeviceIp(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	ip := (data.Payload).(string)
	startTaskManager(ip)

	message := controller.WSServerMessage[string]{
		Type:    1,
		Payload: "OK",
		Message: "Set device ip succesfully.",
		Refer:   data.Event,
	}
	b := JSONStringify(message)
	err := conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Write error:", err)
		conn.Close()
		return
	}
	log.Println("Done")
}

// remove target device
func RemoveAwtrixDevice(conn *websocket.Conn, data *controller.WSClientMessage[any]){
	instance := awtrix_api.GetInstance()
	ip := instance.DeviceIP;
	stopTaskManager()
	log.Println("Remove device: " + ip  + " done.")
}


/**
 * 设备状态（ /api/stats ）
 */
func SubscribeAwtrixStats(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	cache := cacher.Get[*controller.AwtrixStats]()
	m := subscriber.GetManager()

	m.Subscribe(
		conn,
		data.Event,
		constants.AWTRIX_STATE,
		constants.AWTRIX_STATE,
		PushMessagePeriod,
		func() ([]byte, error) {
			v, ok := cache.Get(constants.AWTRIX_STATE)
			if !ok {
				return nil, nil
			}
			msg := controller.WSServerMessage[*controller.AwtrixStats]{
				Type:    1,
				Payload: v,
				Message: "/api/stats",
				Refer:   data.Event,
			}		
			return JSONStringify(msg), nil
		},
	)
}

/**
 * 设备状态（ /api/stats ）
 */
func UnsubscribeAwtrixStats(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	m := subscriber.GetManager()
	m.Unsubscribe(conn, constants.AWTRIX_STATE)
}

/**
 * 设备配置（ /api/settings ）
 */
func SubscribeAwtrixSettings(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	cache := cacher.Get[*controller.AwtrixSettings]()
	m := subscriber.GetManager()

	m.Subscribe(
		conn,
		data.Event,
		constants.AWTRIX_SETTINGS,
		constants.AWTRIX_SETTINGS,
		PushMessagePeriod,
		func() ([]byte, error) {
			v, ok := cache.Get(constants.AWTRIX_SETTINGS)
			if !ok {
				return nil, nil
			}
			msg := controller.WSServerMessage[*controller.AwtrixSettings]{
				Type:    1,
				Payload: v,
				Message: "/api/settings",
				Refer:   data.Event,
			}			
			return JSONStringify(msg), nil
		},
	)
}


/**
 * 设备配置（ /api/settings ）
 */
func UnsubscribeAwtrixSettings(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	m := subscriber.GetManager()
	m.Unsubscribe(conn, constants.AWTRIX_SETTINGS)
}


/**
 * 设备配置（ /api/loop/info ）
 */
func SubscribeAwtrixLoopInfo(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	cache := cacher.Get[*controller.AppLoopInfo]()
	m := subscriber.GetManager()

	m.Subscribe(
		conn,
		data.Event,
		constants.AWTRIX_LOOP_INFO,
		constants.AWTRIX_LOOP_INFO,
		PushMessagePeriod,
		func() ([]byte, error) {
			v, ok := cache.Get(constants.AWTRIX_LOOP_INFO)
			if !ok {
				return nil, nil
			}
			msg := controller.WSServerMessage[*controller.AppLoopInfo]{
				Type:    1,
				Payload: v,
				Message: "/api/loop",
				Refer:   data.Event,
			}					
			return JSONStringify(msg), nil
		},
	)
}


/**
 * 设备配置（ /api/settings ）
 */
func UnsubscribeAwtrixLoopInfo(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	m := subscriber.GetManager()
	m.Unsubscribe(conn, constants.AWTRIX_LOOP_INFO)
}
