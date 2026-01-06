package http_events

import (
	"awtrix3web/http_clinet/awtrix_api"
	"net/http"
	"time"
)

// default index handler
func Index(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error":"not found"}`))
		return
	}

	// 正常首页逻辑
	w.Write([]byte("Hello World!"))
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
