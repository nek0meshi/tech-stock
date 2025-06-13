package utils

import (
	"net"
	"net/url"
	"slices"
)

func IsSafeURL(rawURL string) bool {
	parsedURL, err := url.Parse(rawURL)
	if err != nil {
		return false
	}

	allowedSchemes := []string{"http", "https"}
	if !slices.Contains(allowedSchemes, parsedURL.Scheme) {
		return false
	}

	ips, err := net.LookupIP(parsedURL.Hostname())
	if err != nil {
		return false
	}
	for _, ip := range ips {
		if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
			return false
		}
	}

	// // 安全かつ定番のホストに限定する
	// allowedHosts := []string{"qiita.com", "zenn.dev", "medium.com", "dev.to", "github.com"}

	// return slices.Contains(allowedHosts, parsedURL.Host)

	return true
}
