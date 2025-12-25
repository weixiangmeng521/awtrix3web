package http_events

import (
	"awtrix3web/http_clinet/awtrix_api"
	"net/http"
	"time"
)

func Index(w http.ResponseWriter, r *http.Request) {
	WriteOK(w, "Hello world")
}

/**i
 * check is awtrix device
 */
type CheckIsAwtrixDeviceResponseData struct {
	IsAwtrixDevice bool `json:"isAwtrixDevice"`
}

func CheckIsAwtrixDevice(w http.ResponseWriter, r *http.Request) {
	ip := r.URL.Query().Get("ip")
	if ip == "" {
		WriteErr(w, "invalid request param ip")
		return
	}

	instance := awtrix_api.GetInstance()
	isAwtrixDevice := instance.CheckIsAwtrixDevice(ip, 1000*time.Millisecond)
	WriteOK(w, &CheckIsAwtrixDeviceResponseData{
		IsAwtrixDevice: isAwtrixDevice,
	})
}
