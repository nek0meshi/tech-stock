.PHONY: proto
proto:
	protoc \
		--plugin=protoc-gen-ts_proto="node_modules/.bin/protoc-gen-ts_proto" \
		--ts_proto_out=src/server/grpc-client/generated \
		--ts_proto_opt=outputServices=grpc-js,esModuleInterop=true,forceLong=string \
		--proto_path=../proto \
		../proto/article_info.proto

.PHONY: clean-proto
clean-proto:
	rm -rf pb/*

