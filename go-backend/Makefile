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
