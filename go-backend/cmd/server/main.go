package main

import (
	"context"
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"tech-stock/pb"
)

type articleInfoServer struct {
	pb.UnimplementedArticleInfoServiceServer
}

func (s *articleInfoServer) GetArticleInfo(ctx context.Context, req *pb.GetArticleInfoRequest) (*pb.GetArticleInfoResponse, error) {
	return &pb.GetArticleInfoResponse{
		Title:       "test",
		Description: "test",
		ImageUrl:    "test",
	}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterArticleInfoServiceServer(s, &articleInfoServer{})

	// Reflection有効化
	reflection.Register(s)

	log.Println("gRPC server listening on :50051")

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
