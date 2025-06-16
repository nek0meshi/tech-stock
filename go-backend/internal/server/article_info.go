package server

import (
	"context"
	"log"

	"tech-stock/internal/infra"
	"tech-stock/internal/service"
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

	articleInfoService := service.NewArticleInfoService()
	title, err := articleInfoService.ExtractTitle(html)
	if err != nil {
		return nil, err
	}

	description := articleInfoService.ExtractDescription(html)
	imageUrl := articleInfoService.ExtractImageURL(html)

	log.Println(imageUrl)

	return &pb.GetArticleInfoResponse{
		Title:       title,
		Description: description,
		ImageUrl:    imageUrl,
	}, nil
}
