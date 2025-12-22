package ws_events

import (
	"awtrix3web/controller"
	"awtrix3web/http_clinet/awtrix_api"
	"awtrix3web/scanner"
	"log"

	"github.com/gorilla/websocket"
)

/**
 * 设备扫描事件
 */
func ScannDevicesEvent(conn *websocket.Conn, data *controller.WSClientMessage[any]) {
	log.Println("start scanning")
	// process event
	var onProcess = func(host string) {
		message := controller.WSServerMessage[string]{
			Type:    1,
			Payload: host,
			Message: "scaning",
			Refer:   data.Event,
		}
		b := JSONStringify(message)
		err := conn.WriteMessage(websocket.TextMessage, b)
		if err != nil {
			log.Println("Write error:", err)
			conn.Close()
			return
		}
	}

	// start event
	message := controller.WSServerMessage[string]{
		Type:    2,
		Message: "start",
		Refer:   data.Event,
	}
	b := JSONStringify(message)
	err := conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Write error:", err)
		conn.Close()
		return
	}

	scanner.Run(onProcess)

	// done event
	message = controller.WSServerMessage[string]{
		Type:    4,
		Message: "done",
		Refer:   data.Event,
	}
	b = JSONStringify(message)
	err = conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Write error:", err)
		conn.Close()
		return
	}
}


/**
 * 设备检查事件
 */
type CheckedDeviceInfo struct {
	Ip  string `json:"ip"`
	IsAwtrixDevice bool  `json:"is_awtrix_device"`
}
func CheckAwtrixDevice(conn *websocket.Conn, data *controller.WSClientMessage[any]){
	log.Println("start checking devices")

	ip, ok := data.Payload.(string)
	if !ok {
		message := controller.WSServerMessage[CheckedDeviceInfo]{
			Type:    -1,
			Message: "payload is not string.",
			Refer:   data.Event,
		}
		b := JSONStringify(message)
		err := conn.WriteMessage(websocket.TextMessage, b)
		if err != nil {
			log.Println("Write error:", err)
			conn.Close()
			return
		}
		return
	}
	
	deviceInfo := &CheckedDeviceInfo{}		
	// device info
	deviceInfo.Ip = ip;
	// get awtrix clinet instance
	instance := awtrix_api.GetInstance()
	deviceInfo.IsAwtrixDevice = instance.CheckIsAwtrixDevice(ip)

	// done event
	message := controller.WSServerMessage[CheckedDeviceInfo]{
		Type:    1,
		Message: "check device done.",
		Payload: *deviceInfo,
		Refer:   data.Event,
	}
	b := JSONStringify(message)
	err := conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Write error:", err)
		conn.Close()
		return
	}
}