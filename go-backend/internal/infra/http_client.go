package infra

import (
	"bytes"
	"errors"
	"image"
	"io"
	"log"
	"net/http"
	"slices"
	"time"

	"tech-stock/internal/utils"

	"golang.org/x/net/html"
)

type HttpClient struct{}

type HttpResponse struct {
	Body       []byte
	Header     http.Header
	StatusCode int
}

func NewHttpClient() *HttpClient {
	return &HttpClient{}
}

func (*HttpClient) fetch(url string) (*HttpResponse, error) {
	if !utils.IsSafeURL(url) {
		return nil, errors.New("unsafe URL")
	}

	// セキュリティ観点の安全性のため、厳しめの制限をつける.
	client := &http.Client{
		// タイムアウト
		Timeout: 10 * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if len(via) >= 5 {
				return errors.New("stopped after 5 redirects")
			}

			return nil
		},
	}

	// #nosec G107
	resp, err := client.Get(url)
	if err != nil {
		log.Printf("http.Get error %s %v", url, err)

		return nil, err
	}

	// 10MBまで読み込む.
	limitedReader := io.LimitReader(resp.Body, 10*1024*1024)

	body, err := io.ReadAll(limitedReader)
	if err != nil {
		return nil, err
	}

	err = resp.Body.Close()
	if err != nil {
		log.Printf("resp.Body.Close error %v", err)

		return nil, err
	}

	return &HttpResponse{
		Body:       body,
		Header:     resp.Header.Clone(),
		StatusCode: resp.StatusCode,
	}, nil
}

func (c *HttpClient) FetchHTML(url string) (*html.Node, error) {
	resp, err := c.fetch(url)
	if err != nil {
		return nil, err
	}

	doc, err := html.Parse(bytes.NewReader(resp.Body))
	if err != nil {
		return nil, err
	}

	return doc, nil
}

func (c *HttpClient) FetchImage(url string) (*HttpResponse, error) {
	resp, err := c.fetch(url)
	if err != nil {
		return nil, err
	}

	imageContentTypes := []string{
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
	}

	contentType := resp.Header.Get("Content-Type")

	if !slices.Contains(imageContentTypes, contentType) {
		return nil, errors.New("not an image")
	}

	_, _, err = image.Decode(bytes.NewReader(resp.Body))
	if err != nil {
		return nil, errors.New("not an image")
	}

	return resp, nil
}
