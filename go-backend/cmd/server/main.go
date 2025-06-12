package main

import (
	"context"
	"log"
	"net"
	"os"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/peer"
	"google.golang.org/grpc/reflection"

	"tech-stock/internal/infra"
	"tech-stock/internal/service"
	"tech-stock/pb"

	"github.com/joho/godotenv"
)

type articleInfoServer struct {
	pb.UnimplementedArticleInfoServiceServer
}

type imageServer struct {
	pb.UnimplementedImageServiceServer
}

func (s *articleInfoServer) GetArticleInfo(ctx context.Context, req *pb.GetArticleInfoRequest) (*pb.GetArticleInfoResponse, error) {
	articleInfoService := service.NewArticleInfoService()

	html, err := articleInfoService.FetchHTML(req.Url)
	if err != nil {
		return nil, err
	}

	title, err := articleInfoService.ExtractTitle(html)
	if err != nil {
		return nil, err
	}

	description := articleInfoService.ExtractDescription(html)
	imageUrl := articleInfoService.ExtractImageUrl(html)

	log.Println(imageUrl)

	return &pb.GetArticleInfoResponse{
		Title:       title,
		Description: description,
		ImageUrl:    imageUrl,
	}, nil
}

func (s *imageServer) SaveImageOfUrl(ctx context.Context, req *pb.SaveImageOfUrlRequest) (*pb.SaveImageOfUrlResponse, error) {
	log.Println("url", req.Url)

	imageService := service.NewImageService()

	s3, err := getMinioClient()
	if err != nil {
		log.Printf("getMinioClient error: %v", err)
		return nil, err
	}

	objectKey, err := imageService.SaveImageOfUrl(ctx, req.Url, s3)
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

	s3, err := getMinioClient()
	if err != nil {
		return nil, err
	}

	presignedURL, err := imageService.GetImageOfUrl(ctx, req.ObjectKey, s3)
	if err != nil {
		return nil, err
	}

	return &pb.GetImageUrlResponse{
		PresignedUrl: presignedURL,
	}, nil
}

func loggingInterceptor(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (resp interface{}, err error) {
	start := time.Now()

	// クライアント情報を取得（IPアドレスなど）
	p, _ := peer.FromContext(ctx)
	md, _ := metadata.FromIncomingContext(ctx)

	log.Printf("gRPC Request - Method:%s Remote:%s Metadata:%v Start:%s", info.FullMethod, p.Addr, md, start.Format(time.RFC3339))

	// リクエストを実行
	resp, err = handler(ctx, req)

	// 実行後のログ
	log.Printf("gRPC Response - Method:%s Duration:%s Error:%v", info.FullMethod, time.Since(start), err)

	return resp, err
}

func getMinioClient() (*infra.MinioClient, error) {
	return infra.NewMinioClient(
		os.Getenv("MINIO_ENDPOINT"),
		os.Getenv("MINIO_ACCESS_KEY"),
		os.Getenv("MINIO_SECRET_KEY"),
		os.Getenv("MINIO_BUCKET_NAME"),
	)
}

func main() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer(
		grpc.UnaryInterceptor(loggingInterceptor),
	)
	pb.RegisterArticleInfoServiceServer(s, &articleInfoServer{})
	pb.RegisterImageServiceServer(s, &imageServer{})

	// Reflection有効化
	reflection.Register(s)

	log.Println("gRPC server listening on :50051")

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
