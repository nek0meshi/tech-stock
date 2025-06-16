package main

import (
	"context"
	"log"
	"net"
	"os"
	"time"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/peer"
	"google.golang.org/grpc/reflection"

	"tech-stock/internal/infra"
	"tech-stock/internal/server"
	"tech-stock/pb"
)

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

	log.Printf(
		"gRPC Request - Method:%s Remote:%s Metadata:%v Start:%s",
		info.FullMethod,
		p.Addr,
		md,
		start.Format(time.RFC3339),
	)

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

	// #nosec G102
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	minioClient, err := getMinioClient()
	if err != nil {
		log.Fatalf("failed to getMinioClient: %v", err)
	}

	s := grpc.NewServer(
		grpc.UnaryInterceptor(loggingInterceptor),
	)
	pb.RegisterArticleInfoServiceServer(s, server.NewArticleInfoServer())
	pb.RegisterImageServiceServer(s, server.NewImageServer(minioClient))

	// Reflection有効化
	reflection.Register(s)

	log.Println("gRPC server listening on :50051")

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
