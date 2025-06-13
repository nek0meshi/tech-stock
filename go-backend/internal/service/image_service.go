package service

import (
	"context"
	"fmt"
	"log"
	"mime"
	"time"

	"tech-stock/internal/infra"
)

type ImageService struct{}

func NewImageService() *ImageService {
	return &ImageService{}
}

func (s *ImageService) SaveImageOfUrl(ctx context.Context, imageUrl string, s3 *infra.MinioClient) (string, error) {
	httpClient := infra.NewHttpClient()
	resp, err := httpClient.Get(imageUrl)
	if err != nil {
		return "", err
	}

	contentType := resp.Header.Get("Content-Type")
	ext, _ := mime.ExtensionsByType(contentType)
	fileExt := ".jpg"
	if len(ext) > 0 {
		fileExt = ext[0]
	}

	objectKey := fmt.Sprintf("images/%s%s", time.Now().Format("20060102150405"), fileExt)

	log.Println("objectKey", objectKey)

	err = s3.Upload(context.Background(), objectKey, resp.Body, contentType)
	if err != nil {
		log.Printf("s3.Upload error %s %v", objectKey, err)

		return "", err
	}

	return objectKey, nil
}

func (s *ImageService) GetImageOfURL(ctx context.Context, objectKey string, s3 *infra.MinioClient) (string, error) {
	presignedURL, err := s3.GeneratePresignedURL(ctx, objectKey, 24*time.Hour)
	if err != nil {
		return "", err
	}

	return presignedURL, nil
}
