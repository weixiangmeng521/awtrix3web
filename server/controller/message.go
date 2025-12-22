package controller

// const definedServerTypeList = [
//     -1, // error
//     0,  // invalid
//     1,  // OK
//     2,  // stream start flag
//     3,  // streaming flag
//     4,  // stream end flag
// ] as const;

type WSClientMessage[T any] struct {
	Event   string `json:"event"`
	Payload T      `json:"payload"`
	Message string `json:"message"`
}

type WSServerMessage[T any] struct {
	Type    int    `json:"type"`
	Payload T      `json:"payload"`
	Message string `json:"message"`
	Refer   string `json:"refer"`
}

// --------------------
// Struct definitions
// --------------------
type AwtrixStats struct {
	Bat        int     `json:"bat"`
	BatRaw     int     `json:"bat_raw"`
	Type       int     `json:"type"`
	Lux        int     `json:"lux"`
	LdrRaw     int     `json:"ldr_raw"`
	Ram        int     `json:"ram"`
	Bri        int     `json:"bri"`
	Temp       float64 `json:"temp"` // 有时温度可能是小数，建议 float64
	Hum        float64 `json:"hum"`  // 湿度也建议 float64
	Uptime     int     `json:"uptime"`
	WifiSignal int     `json:"wifi_signal"`
	Messages   int     `json:"messages"`
	Version    string  `json:"version"`
	Indicator1 bool    `json:"indicator1"`
	Indicator2 bool    `json:"indicator2"`
	Indicator3 bool    `json:"indicator3"`
	App        string  `json:"app"`
	UID        string  `json:"uid"`
	Matrix     bool    `json:"matrix"`
	IPAddress  string  `json:"ip_address"`
}

type AwtrixSettings struct {
	MATP        bool   `json:"MATP"`
	ABRI        bool   `json:"ABRI"`
	BRI         int    `json:"BRI"`
	ATRANS      bool   `json:"ATRANS"`
	TCOL        int    `json:"TCOL"`
	TEFF        int    `json:"TEFF"`
	TSPEED      int    `json:"TSPEED"`
	ATIME       int    `json:"ATIME"`
	TMODE       int    `json:"TMODE"`
	CHCOL       int    `json:"CHCOL"`
	CTCOL       int    `json:"CTCOL"`
	CBCOL       int    `json:"CBCOL"`
	TFORMAT     string `json:"TFORMAT"`
	DFORMAT     string `json:"DFORMAT"`
	CEL         bool   `json:"CEL"`
	BLOCKN      bool   `json:"BLOCKN"`
	UPPERCASE   bool   `json:"UPPERCASE"`
	SOM         bool   `json:"SOM"`
	CCORRECTION string `json:"CCORRECTION"`
	CTEMP       string `json:"CTEMP"`
	WD          bool   `json:"WD"`
	WDCA        int    `json:"WDCA"`
	WDCI        int    `json:"WDCI"`
	VOL         int    `json:"VOL"`
	TIME_COL    int    `json:"TIME_COL"`
	DATE_COL    int    `json:"DATE_COL"`
	HUM_COL     int    `json:"HUM_COL"`
	TEMP_COL    int    `json:"TEMP_COL"`
	BAT_COL     int    `json:"BAT_COL"`
	SSPEED      int    `json:"SSPEED"`
	TIM         bool   `json:"TIM"`
	DAT         bool   `json:"DAT"`
	HUM         bool   `json:"HUM"`
	TEMP        bool   `json:"TEMP"`
	BAT         bool   `json:"BAT"`
	OVERLAY     string `json:"OVERLAY"`
}

type AppLoopInfo map[string]int
