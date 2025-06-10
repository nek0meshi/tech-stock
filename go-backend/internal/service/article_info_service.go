package service

import (
	"errors"
	"net/http"

	"golang.org/x/net/html"
)

type ArticleInfoService struct {
}

func NewArticleInfoService() *ArticleInfoService {
	return &ArticleInfoService{}
}

func (s *ArticleInfoService) FetchHTML(url string) (*html.Node, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	doc, err := html.Parse(resp.Body)
	if err != nil {
		return nil, err
	}

	return doc, nil
}

func (s *ArticleInfoService) ExtractTitle(doc *html.Node) (string, error) {
	if doc.Type == html.ElementNode && doc.Data == "title" && doc.FirstChild != nil {
		return doc.FirstChild.Data, nil
	}

	for c := doc.FirstChild; c != nil; c = c.NextSibling {
		title, err := s.ExtractTitle(c)
		if err == nil {
			return title, nil
		}
	}

	return "", errors.New("title not found")
}
