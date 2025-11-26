package scanner

import (
	"net"
	"os/exec"
	"strings"
	"time"
)

// 常见探测速率较高的端口
var probePorts = []string{"80", "443", "22", "53"}

func ping(host string) bool {
	res, _ := ScanHost(host)
	return res
}

func ScanHost(ip string) (bool, string) {
	if pingHost(ip) {
		return true, getMAC(ip)
	}

	if mac := getMAC(ip); mac != "" {
		return true, mac
	}

	for _, port := range probePorts {
		conn, err := net.DialTimeout("tcp", ip+":"+port, 200*time.Millisecond)
		if err == nil {
			_ = conn.Close()
			return true, getMAC(ip)
		}
	}

	return false, ""
}

// 使用系统 ping，兼容性更好
func pingHost(host string) bool {
	cmd := exec.Command("ping", "-c", "1", "-W", "1", host)
	err := cmd.Run()
	return err == nil
}

func getMAC(ip string) string {
	out, _ := exec.Command("arp", "-an").Output()
	lines := strings.Split(string(out), "\n")

	for _, line := range lines {
		if strings.Contains(line, ip) {
			parts := strings.Fields(line)
			for _, p := range parts {
				if strings.Count(p, ":") == 5 {
					return p
				}
			}
		}
	}
	return ""
}
