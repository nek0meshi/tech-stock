package service

import (
	"errors"

	"golang.org/x/net/html"
)

type ArticleInfoService struct {
}

func NewArticleInfoService() *ArticleInfoService {
	return &ArticleInfoService{}
}

// TODO: goqueryで書き換える。
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

func (s *ArticleInfoService) ExtractDescription(doc *html.Node) string {
	if doc.Type == html.ElementNode && doc.Data == "meta" {
		for _, attr := range doc.Attr {
			if attr.Key == "name" && attr.Val == "description" {
				for _, attr := range doc.Attr {
					if attr.Key == "content" {
						return attr.Val
					}
				}
			}
		}
	}

	for c := doc.FirstChild; c != nil; c = c.NextSibling {
		description := s.ExtractDescription(c)
		if description != "" {
			return description
		}
	}

	return ""
}

func (s *ArticleInfoService) ExtractImageUrl(doc *html.Node) string {
	if doc.Type == html.ElementNode && doc.Data == "meta" {
		for _, attr := range doc.Attr {
			if attr.Key == "property" && attr.Val == "og:image" {
				for _, attr := range doc.Attr {
					if attr.Key == "content" {
						return attr.Val
					}
				}
			}
		}
	}

	for c := doc.FirstChild; c != nil; c = c.NextSibling {
		description := s.ExtractImageUrl(c)
		if description != "" {
			return description
		}
	}

	return ""
}
