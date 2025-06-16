DC = docker compose -f ../docker-compose.yml

.PHONY: setup
setup:
	go install github.com/air-verse/air@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

.PHONY: pb
pb: clean-pb
	protoc \
		--proto_path=../proto \
		--go_out=pb \
		--go_opt=paths=source_relative \
		--go-grpc_out=pb \
		--go-grpc_opt=paths=source_relative \
		../proto/*.proto

.PHONY: clean-pb
clean-pb:
	rm -rf pb/*

.PHONY: lint
lint:
	golangci-lint run

.PHONY: lint-fix
lint-fix:
	golangci-lint run --fix

.PHONY: fmt
fmt:
	golangci-lint fmt

.PHONY: run-server
run-server:
	air

URL ?= https://www.google.com
.PHONY: test-grpc
test-grpc:
	grpcurl -plaintext -d '{"url": "$(URL)"}' localhost:50051 article_info.ArticleInfoService/GetArticleInfo
