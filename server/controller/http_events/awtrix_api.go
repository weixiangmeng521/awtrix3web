package http_events

import (
	"awtrix3web/http_clinet/awtrix_api"
	"net/http"
)

/*
|--------------------------------------------------------------------------
| Common Response Structs
|--------------------------------------------------------------------------
*/

type ListResponse[T any] struct {
	List T `json:"list"`
}

type BoolRequest struct {
	Value bool `json:"value"`
}

type IntRequest struct {
	Value int `json:"value"`
}

type StringRequest struct {
	Value string `json:"value"`
}

type PowerRequest struct {
	Power bool `json:"power"`
}

type EmptyResponse struct{}
/*
|--------------------------------------------------------------------------
| Query APIs (GET)
|--------------------------------------------------------------------------
*/

// GET /api/transitions
func GetTransitionEffectList(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	list, err := instance.GetAllTransitions()
	if err != nil {
		WriteErr(w, "Fail to get transition list.")
		return
	}
	WriteOK(w, &ListResponse[[]string]{List: list})
}

// GET /api/effects
func GetEffectList(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	list, err := instance.GetAllEffects()
	if err != nil {
		WriteErr(w, "Fail to get effect list.")
		return
	}
	WriteOK(w, &ListResponse[[]string]{List: list})
}

// GET /api/loop
func GetAwtrixLoopInfo(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	info, err := instance.GetAwtrixApiLoopInfo()
	if err != nil {
		WriteErr(w, "Fail to get loop info.")
		return
	}
	WriteOK(w, info)
}

// GET /api/stats (from cache)
func GetAwtrixStats(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	info, err := instance.GetAwtrixDeviceInfo()
	if err != nil {
		WriteErr(w, err.Error())
		return
	}
	WriteOK(w, info)
}

/*
|--------------------------------------------------------------------------
| Power & System
|--------------------------------------------------------------------------
*/

// POST /api/power
func SetAwtrixPower(w http.ResponseWriter, r *http.Request) {
	var req PowerRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}

	instance := awtrix_api.GetInstance()
	if err := instance.SetAwtrixPower(req.Power); err != nil {
		WriteErr(w, "Fail to set power.")
		return
	}

	WriteOK(w, &EmptyResponse{})
}

// POST /api/reboot
func RebootAwtrix(w http.ResponseWriter, r *http.Request) {
	instance := awtrix_api.GetInstance()
	if err := instance.Reboot(); err != nil {
		WriteErr(w, "Fail to reboot device.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

/*
|--------------------------------------------------------------------------
| Display / Brightness / Format
|--------------------------------------------------------------------------
*/

// POST /api/brightness
func SetMatrixBrightness(w http.ResponseWriter, r *http.Request) {
	var req IntRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetMatrixBrightness(req.Value); err != nil {
		WriteErr(w, "Fail to set brightness.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

// POST /api/time-format
func SetTimeFormat(w http.ResponseWriter, r *http.Request) {
	var req StringRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetTimeFormat(req.Value); err != nil {
		WriteErr(w, "Fail to set time format.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

// POST /api/date-format
func SetDateFormat(w http.ResponseWriter, r *http.Request) {
	var req StringRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetDateFormat(req.Value); err != nil {
		WriteErr(w, "Fail to set date format.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

/*
|--------------------------------------------------------------------------
| Transition / Effect
|--------------------------------------------------------------------------
*/

// POST /api/transition/effect
func SetTransitionEffect(w http.ResponseWriter, r *http.Request) {
	var req IntRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetTransitionEffect(req.Value); err != nil {
		WriteErr(w, "Fail to set transition effect.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

// POST /api/transition/speed
func SetTransitionSpeed(w http.ResponseWriter, r *http.Request) {
	var req IntRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetTranstionTime(req.Value); err != nil {
		WriteErr(w, "Fail to set transition speed.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

/*
|--------------------------------------------------------------------------
| App Control
|--------------------------------------------------------------------------
*/

// POST /api/switch-app
func SwitchApp(w http.ResponseWriter, r *http.Request) {
	var req StringRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SetSpecificApp(req.Value); err != nil {
		WriteErr(w, "Fail to switch app.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

/*
|--------------------------------------------------------------------------
| Native Apps
|--------------------------------------------------------------------------
*/

func SetTIMApp(w http.ResponseWriter, r *http.Request)  { setNative(w, r, "TIM") }
func SetDATApp(w http.ResponseWriter, r *http.Request)  { setNative(w, r, "DAT") }
func SetHUMApp(w http.ResponseWriter, r *http.Request)  { setNative(w, r, "HUM") }
func SetTEMPApp(w http.ResponseWriter, r *http.Request) { setNative(w, r, "TEMP") }
func SetBATApp(w http.ResponseWriter, r *http.Request)  { setNative(w, r, "BAT") }
func SetMATPApp(w http.ResponseWriter, r *http.Request) { setNative(w, r, "MATP") }

func setNative(w http.ResponseWriter, r *http.Request, app string) {
	var req BoolRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}

	instance := awtrix_api.GetInstance()
	var err error

	switch app {
	case "TIM":
		err = instance.SetTIM_APP(req.Value)
	case "DAT":
		err = instance.SetDAT_APP(req.Value)
	case "HUM":
		err = instance.SetHUM_APP(req.Value)
	case "TEMP":
		err = instance.SetTEMP_APP(req.Value)
	case "BAT":
		err = instance.SetBAT_APP(req.Value)
	case "MATP":
		err = instance.SetMATP_APP(req.Value)
	}

	if err != nil {
		WriteErr(w, "Fail to set app state.")
		return
	}

	WriteOK(w, &EmptyResponse{})
}

/*
|--------------------------------------------------------------------------
| Sound
|--------------------------------------------------------------------------
*/

// POST /api/sound/play
func PlaySound(w http.ResponseWriter, r *http.Request) {
	var req StringRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SendPlaySound(req.Value); err != nil {
		WriteErr(w, "Fail to play sound.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}

// POST /api/sound/rtttl
func PlayRTTTL(w http.ResponseWriter, r *http.Request) {
	var req StringRequest
	if err := ReadJSON(r, &req); err != nil {
		WriteErr(w, "Invalid request body.")
		return
	}
	if err := awtrix_api.GetInstance().SendRTTTL(req.Value); err != nil {
		WriteErr(w, "Fail to play RTTTL.")
		return
	}
	WriteOK(w, &EmptyResponse{})
}
