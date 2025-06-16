package server

import (
	"context"
	"log"

	"tech-stock/internal/infra"
	"tech-stock/pb"
)

type articleInfoServer struct {
	pb.UnimplementedArticleInfoServiceServer
}

func NewArticleInfoServer() *articleInfoServer {
	return &articleInfoServer{}
}

func (s *articleInfoServer) GetArticleInfo(
	ctx context.Context,
	req *pb.GetArticleInfoRequest,
) (*pb.GetArticleInfoResponse, error) {
	httpClient := infra.NewHttpClient()
	html, err := httpClient.FetchHTML(req.Url)
	if err != nil {
		return nil, err
	}

	title := html.Find("title").Text()
	description := html.Find("meta[name='description']").AttrOr("content", "")
	imageUrl := html.Find("meta[property='og:image']").AttrOr("content", "")

	log.Println("imageUrl: ", imageUrl)

	// 画像ファイルであることを検証.
	_, err = httpClient.FetchImage(imageUrl)
	if err != nil {
		log.Println("FetchImage error: ", err)
		imageUrl = ""
	}

	return &pb.GetArticleInfoResponse{
		Title:       title,
		Description: description,
		ImageUrl:    imageUrl,
	}, nil
}
