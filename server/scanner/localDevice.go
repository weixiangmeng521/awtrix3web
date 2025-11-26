package scanner

import (
	"fmt"
	"net"
	"os"
	"runtime"
	"strings"
)

func Run(onProcess func(string)) {
	runtime.GOMAXPROCS(4)
	list := Getlocaladdr()
	for _, ch := range list {
		Task(ch, onProcess)
	}
}

func Getlocaladdr() []string {
	addrs, err := net.InterfaceAddrs()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	var list []string
	for _, address := range addrs {
		// 检查ip地址判断是否回环地址
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				a := strings.Split(ipnet.IP.String(), ".")
				if a[3] == "1" {
					continue
				}
				res := Address_Processing(ipnet.IP.String())
				list = append(list, res...)
			}
		}
	}
	return list
}

func Address_Processing(ip string) []string {
	var IpHalf_Str []string
	a := strings.Split(ip, ".")
	if len(a) != 4 {
		fmt.Println("检查地址错误！")
		os.Exit(1)
	}

	host := fmt.Sprintf("%s.%s.%s", a[0], a[1], a[2])
	// fmt.Println("获取本机地址:", ip, "------->  处理为网段:", host)
	IpHalf_Str = append(IpHalf_Str, host)
	return IpHalf_Str
}
