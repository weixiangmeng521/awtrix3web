package http_events

import (
	"awtrix3web/controller"
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

const MAX_BODY_SIZE = 1 << 20 // 1MB


func JSONStringify[T any](message controller.HttpServerMessage[T]) []byte {
	b, err := json.Marshal(message)
	if err != nil {
		log.Println("Marshal fail:", err)
		return nil
	}
	return b
}

// ReadJSON safely reads and decodes JSON request body
func ReadJSON(r *http.Request, dst any) error {
	if r.Body == nil {
		return errors.New("request body is empty")
	}
	defer r.Body.Close()

	// limit body size
	r.Body = http.MaxBytesReader(nil, r.Body, MAX_BODY_SIZE)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	if err := dec.Decode(dst); err != nil {
		return err
	}

	// prevent multiple JSON objects
	if dec.More() {
		return errors.New("request body must contain a single JSON object")
	}

	return nil
}

func WriteOK[T any](w http.ResponseWriter, data T){
	msg := &controller.HttpServerMessage[T] {}
	msg.Code = 1
	msg.Data = data
	msg.Message = "";
	b := JSONStringify(*msg)
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func WriteErr(w http.ResponseWriter, m string){
	msg := &controller.HttpServerMessage[string] {}
	msg.Code = -1
	msg.Message = m;
	b := JSONStringify(*msg)
	w.Write(b)
}