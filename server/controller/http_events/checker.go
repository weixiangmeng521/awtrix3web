package http_events

import (
	"awtrix3web/http_clinet/awtrix_api"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	WriteOK(w, "Hello world")
}

/**
 * check is awtrix device
 */
func CheckIsAwtrixDevice(w http.ResponseWriter, r *http.Request) {
	ip := r.URL.Query().Get("ip")
	if ip == "" {
		WriteErr(w, "invalid request param ip")
		return
	}

	instance := awtrix_api.GetInstance()
	isAwtrixDevice := instance.CheckIsAwtrixDevice(ip)
	WriteOK(w, isAwtrixDevice)
}
