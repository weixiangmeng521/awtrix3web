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

		WSEventMapper[data.Event](conn, &data)

		// // 回显消息
		// err = conn.WriteMessage(websocket.TextMessage, msg)
		// if err != nil {
		// 	log.Println("Write error:", err)
		// 	return
		// }
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
