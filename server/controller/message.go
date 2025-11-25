package controller

type WSClientMessage[T any] struct {
	Event    string `json:"event"`
	Playload T      `json:"playload"`
	Message  string `json:"message"`
}

type WSServerMessage[T any] struct {
	Type     int    `json:"type"`
	Playload T      `json:"playload"`
	Message  string `json:"message"`
	Refer    string `json:"refer"`
}
