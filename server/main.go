package main

import (
	"awtrix3web/router"
	"bytes"
	"fmt"
	"net/http"
	"os/exec"
)

func getFromAwtrix() {
	cmd := exec.Command(
		"curl",
		"-A",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
		"http://192.168.0.227/api/stats",
	)

	var out bytes.Buffer
	var errOut bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &errOut

	err := cmd.Run()
	if err != nil {
		fmt.Println("curl error:", err)
	}

	if errOut.Len() > 0 {
		fmt.Println("stderr:", errOut.String())
	}

	fmt.Println("stdout:", out.String())
}

func main() {
	// getFromAwtrix()
	customHttp := http.NewServeMux()
	router.InitWebSocket(customHttp)
	router.InitRouter(customHttp)

	fmt.Println("Server is running at http://0.0.0.0:9527")

	err := http.ListenAndServe(":9527", customHttp)
	if err != nil {
		fmt.Println("Error:", err)
	}
}
