package infra

import (
	"errors"
	"log"
	"net/http"

	"tech-stock/internal/utils"

	"golang.org/x/net/html"
)

type HttpClient struct{}

func NewHttpClient() *HttpClient {
	return &HttpClient{}
}

func (*HttpClient) Get(url string) (*http.Response, error) {
	if !utils.IsSafeURL(url) {
		return nil, errors.New("unsafe URL")
	}

	// #nosec G107
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("http.Get error %s %v", url, err)

		return nil, err
	}

	err = resp.Body.Close()
	if err != nil {
		log.Printf("resp.Body.Close error %v", err)

		return nil, err
	}

	return resp, nil
}

func (c *HttpClient) FetchHTML(url string) (*html.Node, error) {
	resp, err := c.Get(url)
	if err != nil {
		return nil, err
	}

	doc, err := html.Parse(resp.Body)
	if err != nil {
		return nil, err
	}

	return doc, nil
}
