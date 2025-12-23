package http_events

import (
	"awtrix3web/http_clinet/awtrix_api"
	"net/http"
)

/**
 * reboot device
 */
func RebootDevice(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	isAwtrixDevice := instance.Reboot()
	WriteOK(w, isAwtrixDevice)
}
