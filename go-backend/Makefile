.PHONY: setup
setup:
	go install golang.org/x/tools/cmd/goimports@latest
	go install github.com/air-verse/air@latest

.PHONY: pb
pb: clean-pb
	protoc \
		--proto_path=proto \
		--go_out=pb \
		--go_opt=paths=source_relative \
		--go-grpc_out=pb \
		--go-grpc_opt=paths=source_relative \
		proto/article_info.proto

.PHONY: clean-pb
clean-pb:
	rm -rf pb/*

.PHONY: fmt
fmt:
	goimports -w .

.PHONY: run-server
run-server:
	cd cmd/server && air main.go

URL ?= https://www.google.com
.PHONY: test-grpc
test-grpc:
	grpcurl -plaintext -d '{"url": "$(URL)"}' localhost:50051 article_info.ArticleInfoService/GetArticleInfo
