package ws_events

import (
	"awtrix3web/controller"
	"log"

	"github.com/gorilla/websocket"
)

/**
 * 心跳响应事件
 */
func HeartBeatEvent(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	message := controller.WSServerMessage[string]{
		Type:    1,
		Payload: "pong",
		Message: "server heartbeat response",
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
