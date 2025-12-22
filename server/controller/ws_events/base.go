package ws_events

import (
	"awtrix3web/controller"
	"encoding/json"
	"log"
)

func JSONStringify[T any](message controller.WSServerMessage[T]) []byte {
	b, err := json.Marshal(message)
	if err != nil {
		log.Println("Marshal fail:", err)
		return nil
	}
	return b
}
