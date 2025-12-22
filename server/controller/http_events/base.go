package http_events

import (
	"awtrix3web/controller"
	"encoding/json"
	"log"
	"net/http"
)

func JSONStringify[T any](message controller.HttpServerMessage[T]) []byte {
	b, err := json.Marshal(message)
	if err != nil {
		log.Println("Marshal fail:", err)
		return nil
	}
	return b
}


func WriteOK[T any](w http.ResponseWriter, data T){
	msg := &controller.HttpServerMessage[T] {}
	msg.Code = 1
	msg.Data = data
	msg.Message = "";
	b := JSONStringify(*msg)
	w.Write(b)
}

func WriteErr(w http.ResponseWriter, m string){
	msg := &controller.HttpServerMessage[string] {}
	msg.Code = -1
	msg.Message = m;
	b := JSONStringify(*msg)
	w.Write(b)
}