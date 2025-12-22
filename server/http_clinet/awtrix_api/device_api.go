package awtrix_api

import (
	"awtrix3web/cacher"
	"awtrix3web/constants"
	"awtrix3web/controller"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

type AwtrixClient struct {
	DeviceIP   string
	httpClient *http.Client
}

var (
	instance     *AwtrixClient
	instanceLock sync.Mutex
)

// Create a new AwtrixClient with timeout
func New(ip string) *AwtrixClient {
	if instance != nil {
		return instance
	}

	instanceLock.Lock()
	defer instanceLock.Unlock()

	if instance == nil {
		instance = &AwtrixClient{
			DeviceIP: ip,
			httpClient: &http.Client{
				Timeout: 5 * time.Second,
			},
		}
	}

	return instance
}

func GetInstance() *AwtrixClient {
	instanceLock.Lock()
	defer instanceLock.Unlock()
	return instance
}

// --------------------
// Internal HTTP helper
// --------------------
func (c *AwtrixClient) request(
	ctx context.Context,
	method string,
	path string,
	payload any,
	respStruct any,
) error {
	var body io.Reader = nil
	if payload != nil {
		j, err := json.Marshal(payload)
		if err != nil {
			log.Panic("json.Marshal err:" + err.Error())
			return err
		}
		body = bytes.NewBuffer(j)
	}

	ip := strings.ReplaceAll(c.DeviceIP, `"`, "")
	url := "http://" + ip + path

	req, err := http.NewRequestWithContext(
		ctx,
		method,
		url,
		body,
	)
	if err != nil {
		log.Panic("Route not found." + err.Error())
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	res, err := c.httpClient.Do(req)
	if err != nil {
		log.Panic("Request error." + err.Error())
		return err
	}
	defer res.Body.Close()
	if res.StatusCode < 200 || res.StatusCode > 299 {
		b, _ := io.ReadAll(res.Body)
		log.Fatalf("HTTP %d: %s", res.StatusCode, string(b))
		return fmt.Errorf("HTTP %d: %s", res.StatusCode, string(b))
	}

	if respStruct != nil {
		return json.NewDecoder(res.Body).Decode(respStruct)
	}

	return nil
}

// --------------------
// Public API — same style as TS
// --------------------

func (c *AwtrixClient) GetAwtrixDeviceInfo() (*controller.AwtrixStats, error) {
	StatsCache := cacher.Get[*controller.AwtrixStats]()
	v, ok := StatsCache.Get(constants.AWTRIX_STATE)
	if !ok {
		return nil, fmt.Errorf("stats not ready yet")
	}

	return v, nil
}

/**
 * check device is awtrix device
 */
func (c *AwtrixClient) CheckIsAwtrixDevice(ip string) bool {
	client := &http.Client{
		Timeout: 1000 * time.Millisecond,
	}
	url := fmt.Sprintf("http://%s/api/settings", ip)
	resp, err := client.Get(url)
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return false
	}
	body, err := io.ReadAll(resp.Body)
	str := strings.TrimSpace(string(body))
	if len(str) > 0 && str[0] == byte('{') {
		return true
	}
	return false
}

func (c *AwtrixClient) GetTransitionEffectList() ([]string, error) {
	var out []string
	err := c.request(context.Background(), "GET", "/api/transitions", nil, &out)
	return out, err
}

func (c *AwtrixClient) GetAwtrixApiLoopInfo() (*controller.AppLoopInfo, error) {
	var out controller.AppLoopInfo
	err := c.request(context.Background(), "GET", "/api/loop", nil, &out)
	return &out, err
}

func (c *AwtrixClient) GetAllTransitions() ([]string, error) {
	var out []string
	err := c.request(context.Background(), "GET", "/api/transitions", nil, &out)
	return out, err
}

func (c *AwtrixClient) GetAllEffects() ([]string, error) {
	var out []string
	err := c.request(context.Background(), "GET", "/api/effects", nil, &out)
	return out, err
}

func (c *AwtrixClient) GetSettingInfo() (*controller.AwtrixSettings, error) {
	var out controller.AwtrixSettings
	err := c.request(context.Background(), "GET", "/api/settings", nil, &out)
	return &out, err
}

func (c *AwtrixClient) SetAwtrixPower(state bool) error {
	return c.request(context.Background(), "POST", "/api/power",
		map[string]any{"power": state}, nil)
}

// Common setting setter
func (c *AwtrixClient) setSetting(key string, val any) error {
	payload := map[string]any{key: val}
	return c.request(context.Background(), "POST", "/api/settings", payload, nil)
}

// Now all following become 1-line wrappers:

func (c *AwtrixClient) SetBrightnessAutoControl(state bool) error {
	return c.setSetting("ABRI", state)
}

func (c *AwtrixClient) SetCalendarHeaderColor(col any) error {
	return c.setSetting("CHCOL", col)
}

func (c *AwtrixClient) SetCalendarBodyColor(col any) error {
	return c.setSetting("CBCOL", col)
}

func (c *AwtrixClient) SetDateAppColor(col any) error {
	return c.setSetting("DATE_COL", col)
}

func (c *AwtrixClient) SetDateFormat(format string) error {
	return c.setSetting("DFORMAT", format)
}

func (c *AwtrixClient) SetHumidityAppColor(col any) error {
	return c.setSetting("HUM_COL", col)
}

func (c *AwtrixClient) SetTemperatureAppColor(col any) error {
	return c.setSetting("TEMP_COL", col)
}

func (c *AwtrixClient) SetBatteryAppColor(col any) error {
	return c.setSetting("BAT_COL", col)
}

func (c *AwtrixClient) SetCalendarTextColor(col any) error {
	return c.setSetting("CTCOL", col)
}

func (c *AwtrixClient) SetTempUnit(state bool) error {
	return c.setSetting("CEL", state)
}

func (c *AwtrixClient) SetTimeFormat(format string) error {
	return c.setSetting("TFORMAT", format)
}

func (c *AwtrixClient) SetMatrixBrightness(val int) error {
	return c.setSetting("BRI", val)
}

func (c *AwtrixClient) SetAutoSwitching2NextApp(state bool) error {
	return c.setSetting("ATRANS", state)
}

func (c *AwtrixClient) SetTransitionEffect(val int) error {
	return c.setSetting("TEFF", val)
}

func (c *AwtrixClient) SetSpecificApp(app string) error {
	return c.request(context.Background(), "POST", "/api/switch",
		map[string]any{"name": app}, nil)
}

func (c *AwtrixClient) SetTranstionTime(ms int) error {
	return c.setSetting("TSPEED", ms)
}

func (c *AwtrixClient) SetGlobalTextColor(col any) error {
	return c.setSetting("TCOL", col)
}

func (c *AwtrixClient) SetOverlayEffect(key string) error {
	return c.setSetting("OVERLAY", key)
}

func (c *AwtrixClient) SetScrollSpeedModification(num int) error {
	return c.setSetting("SSPEED", num)
}

func (c *AwtrixClient) SetDisplayTextInUppercase(val bool) error {
	return c.setSetting("UPPERCASE", val)
}

func (c *AwtrixClient) SetDurationAnAppIsDisplayed(sec int) error {
	return c.setSetting("ATIME", sec)
}

func (c *AwtrixClient) SetBlockPhysicalNavigationKeys(state bool) error {
	return c.setSetting("BLOCKN", state)
}

func (c *AwtrixClient) SendRTTTL(str string) error {
	return c.request(context.Background(), "POST", "/api/rtttl",
		map[string]any{"rttl": str}, nil)
}

func (c *AwtrixClient) SendPlaySound(name string) error {
	return c.request(context.Background(), "POST", "/api/sound",
		map[string]any{"sound": name}, nil)
}

// Native apps
func (c *AwtrixClient) setNative(app string, state bool) error {
	return c.setSetting(app, map[bool]int{true: 1, false: 0}[state])
}

func (c *AwtrixClient) SetTIM_APP(state bool) error  { return c.setNative("TIM", state) }
func (c *AwtrixClient) SetDAT_APP(state bool) error  { return c.setNative("DAT", state) }
func (c *AwtrixClient) SetHUM_APP(state bool) error  { return c.setNative("HUM", state) }
func (c *AwtrixClient) SetTEMP_APP(state bool) error { return c.setNative("TEMP", state) }
func (c *AwtrixClient) SetBAT_APP(state bool) error  { return c.setNative("BAT", state) }
func (c *AwtrixClient) SetMATP_APP(state bool) error { return c.setNative("MATP", state) }

func (c *AwtrixClient) Reboot() error {
	return c.request(context.Background(), "POST", "/api/reboot", nil, nil)
}

// Wait for device online
func (c *AwtrixClient) WaitReconnect() {
	for {
		ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
		err := c.request(ctx, "GET", "/api/stats", nil, nil)
		cancel()
		if err == nil {
			fmt.Println("Connected…")
			return
		}
		time.Sleep(100 * time.Millisecond)
		fmt.Println("Reconnect…")
	}
}
