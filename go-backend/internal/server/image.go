package server

import (
	"context"
	"log"

	"tech-stock/internal/infra"
	"tech-stock/internal/service"
	"tech-stock/pb"
)

type imageServer struct {
	pb.UnimplementedImageServiceServer
	minioClient *infra.MinioClient
}

func NewImageServer(minioClient *infra.MinioClient) *imageServer {
	return &imageServer{
		minioClient: minioClient,
	}
}

func (s *imageServer) SaveImageOfUrl(
	ctx context.Context,
	req *pb.SaveImageOfUrlRequest,
) (*pb.SaveImageOfUrlResponse, error) {
	log.Println("url", req.Url)

	imageService := service.NewImageService()

	objectKey, err := imageService.SaveImageOfUrl(ctx, req.Url, s.minioClient)
	if err != nil {
		log.Printf("SaveImageOfUrl error: %v", err)
		return nil, err
	}

	log.Println(objectKey)

	return &pb.SaveImageOfUrlResponse{
		ObjectKey: objectKey,
	}, nil
}

func (s *imageServer) GetImageUrl(ctx context.Context, req *pb.GetImageUrlRequest) (*pb.GetImageUrlResponse, error) {
	imageService := service.NewImageService()

	presignedURL, err := imageService.GetImageOfURL(ctx, req.ObjectKey, s.minioClient)
	if err != nil {
		return nil, err
	}

	return &pb.GetImageUrlResponse{
		PresignedUrl: presignedURL,
	}, nil
}
