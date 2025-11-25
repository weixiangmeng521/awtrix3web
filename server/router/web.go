package router

import (
	"fmt"
	"net/http"
)

func InitRouter(customHttp *http.ServeMux) {
	customHttp.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, Golang Web Server!")
	})
}
