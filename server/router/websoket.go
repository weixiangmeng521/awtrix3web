package router

import (
	"awtrix3web/controller"
	"awtrix3web/controller/ws_events"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var WSEventMapper map[string]func(conn *websocket.Conn, data *controller.WSClientMessage[any])

func init() {
	WSEventMapper = make(map[string]func(conn *websocket.Conn, data *controller.WSClientMessage[any]))
	WSEventMapper["ping"] = ws_events.HeartBeatEvent
	WSEventMapper["scann_devices"] = ws_events.ScannDevicesEvent
	WSEventMapper["check_awtrix_device"] = ws_events.CheckAwtrixDevice
	WSEventMapper["set_awtrix_device_ip"] = ws_events.SetAwtrixDeviceIp
	WSEventMapper["remove_awtrix_device"] = ws_events.RemoveAwtrixDevice
	WSEventMapper["sub_awtrix_states"] = ws_events.SubscribeAwtrixStats
	WSEventMapper["unsub_awtrix_states"] = ws_events.UnsubscribeAwtrixStats
	WSEventMapper["sub_awtrix_settings"] = ws_events.SubscribeAwtrixSettings
	WSEventMapper["unsub_awtrix_settings"] = ws_events.UnsubscribeAwtrixSettings
	WSEventMapper["sub_awtrix_loop_info"] = ws_events.SubscribeAwtrixLoopInfo
	WSEventMapper["unsub_awtrix_loop_info"] = ws_events.UnsubscribeAwtrixLoopInfo	
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true }, // 允许跨域
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	log.Println("Client connected")

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Client disconnected")
			return
		}

		log.Println("Received:", string(msg))
		data, err := JSONParser[any](msg)
		if err != nil {
			log.Println("Unmarshal fail:" + string(msg))
			return
		}

		log.Println(">>> Event:" + data.Event)
		WSEventMapper[data.Event](conn, &data)
	}
}

func JSONParser[T any](b []byte) (controller.WSClientMessage[T], error) {
	var m controller.WSClientMessage[T]
	err := json.Unmarshal(b, &m)
	if err != nil {
		return m, err
	}
	return m, nil
}

func InitWebSocket(mux *http.ServeMux) {
	mux.HandleFunc("/ws", wsHandler)
}
