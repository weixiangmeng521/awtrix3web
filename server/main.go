package main

import (
	"awtrix3web/router"
	"fmt"
	"net/http"
)

func main() {
	customHttp := http.NewServeMux() // 推荐写法
	router.InitWebSocket(customHttp)
	router.InitRouter(customHttp)

	fmt.Println("Server is running at http://0.0.0.0:9527")

	err := http.ListenAndServe(":9527", customHttp)
	if err != nil {
		fmt.Println("Error:", err)
	}
}
