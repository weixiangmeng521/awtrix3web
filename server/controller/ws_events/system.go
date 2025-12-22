package ws_events

import (
	"awtrix3web/controller"
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

func JSONStringify[T any](message controller.WSServerMessage[T]) []byte {
	b, err := json.Marshal(message)
	if err != nil {
		log.Println("Marshal fail:", err)
		return nil
	}
	return b
}

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
