// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v5.29.3
// source: article_info.proto

package pb

import (
	context "context"

	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	ArticleInfoService_GetArticleInfo_FullMethodName = "/article_info.ArticleInfoService/GetArticleInfo"
)

// ArticleInfoServiceClient is the client API for ArticleInfoService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ArticleInfoServiceClient interface {
	GetArticleInfo(ctx context.Context, in *GetArticleInfoRequest, opts ...grpc.CallOption) (*GetArticleInfoResponse, error)
}

type articleInfoServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewArticleInfoServiceClient(cc grpc.ClientConnInterface) ArticleInfoServiceClient {
	return &articleInfoServiceClient{cc}
}

func (c *articleInfoServiceClient) GetArticleInfo(ctx context.Context, in *GetArticleInfoRequest, opts ...grpc.CallOption) (*GetArticleInfoResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(GetArticleInfoResponse)
	err := c.cc.Invoke(ctx, ArticleInfoService_GetArticleInfo_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ArticleInfoServiceServer is the server API for ArticleInfoService service.
// All implementations must embed UnimplementedArticleInfoServiceServer
// for forward compatibility.
type ArticleInfoServiceServer interface {
	GetArticleInfo(context.Context, *GetArticleInfoRequest) (*GetArticleInfoResponse, error)
	mustEmbedUnimplementedArticleInfoServiceServer()
}

// UnimplementedArticleInfoServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedArticleInfoServiceServer struct{}

func (UnimplementedArticleInfoServiceServer) GetArticleInfo(context.Context, *GetArticleInfoRequest) (*GetArticleInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetArticleInfo not implemented")
}
func (UnimplementedArticleInfoServiceServer) mustEmbedUnimplementedArticleInfoServiceServer() {}
func (UnimplementedArticleInfoServiceServer) testEmbeddedByValue()                            {}

// UnsafeArticleInfoServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ArticleInfoServiceServer will
// result in compilation errors.
type UnsafeArticleInfoServiceServer interface {
	mustEmbedUnimplementedArticleInfoServiceServer()
}

func RegisterArticleInfoServiceServer(s grpc.ServiceRegistrar, srv ArticleInfoServiceServer) {
	// If the following call pancis, it indicates UnimplementedArticleInfoServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&ArticleInfoService_ServiceDesc, srv)
}

func _ArticleInfoService_GetArticleInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetArticleInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ArticleInfoServiceServer).GetArticleInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ArticleInfoService_GetArticleInfo_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ArticleInfoServiceServer).GetArticleInfo(ctx, req.(*GetArticleInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ArticleInfoService_ServiceDesc is the grpc.ServiceDesc for ArticleInfoService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ArticleInfoService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "article_info.ArticleInfoService",
	HandlerType: (*ArticleInfoServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetArticleInfo",
			Handler:    _ArticleInfoService_GetArticleInfo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "article_info.proto",
}
