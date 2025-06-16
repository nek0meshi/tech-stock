package infra

import (
	"context"
	"io"
	"log"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioClient struct {
	client     *minio.Client
	bucketName string
}

func NewMinioClient(endpoint, accessKey, secretKey, bucketName string) (*MinioClient, error) {
	log.Println("[", endpoint, accessKey, secretKey, bucketName, "]")

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false,
	})
	if err != nil {
		log.Printf("minio.New error: %v", err)
		return nil, err
	}

	return &MinioClient{
		client:     client,
		bucketName: bucketName,
	}, nil
}

func (m *MinioClient) Upload(ctx context.Context, objectKey string, reader io.Reader, contentType string) error {
	_, err := m.client.PutObject(ctx, m.bucketName, objectKey, reader, -1, minio.PutObjectOptions{
		ContentType: contentType,
	})

	return err
}

func (m *MinioClient) GeneratePresignedURL(
	ctx context.Context,
	objectKey string,
	expires time.Duration,
) (string, error) {
	presignedURL, err := m.client.PresignedGetObject(ctx, m.bucketName, objectKey, expires, nil)
	if err != nil {
		return "", err
	}

	return presignedURL.String(), nil
}
