# 仕様書: gRPC Server

## ■ サービス概要

指定されたWebページのURLを受け取り、そのページのタイトルやOGPメタデータ（Open Graph Protocol）を返すgRPCサービス。

## ■ API仕様（Proto定義イメージ）

```protobuf
service ArticleInfoService {
  rpc FetchMetadata(FetchMetadataRequest) returns (FetchMetadataResponse);
}

message FetchMetadataRequest {
  string url = 1;  // 取得対象のURL
}

message FetchMetadataResponse {
  string title = 1;
  string description = 2;
  string image = 3;
  map<string, string> ogp = 4; // その他のog:*メタ情報
}
```

## ■ ディレクトリ構成

```
go-backend/
├── cmd/
│   └── server/
│       └── main.go                            # エントリーポイント
│
├── api/
│   └── proto/
│       └── articleinfo/
│           └── articleinfo.proto              # ← Protoファイル（名前も統一）
│
├── pb/
│   ├── articleinfo.pb.go
│   ├── articleinfo_grpc.pb.go
│
├── internal/
│   └── articleinfo/
│       ├── service/                           # gRPCハンドラ
│       │   └── service.go
│       ├── usecase/                           # ビジネスロジック
│       │   └── usecase.go
│       └── repository/                        # HTMLパースなど
│           └── metadata_fetcher.go
│
├── pkg/
│   └── httpclient/
│       └── client.go
│
├── configs/
│   └── config.yaml
│
├── scripts/
│   └── gen_proto.sh
│
├── go.mod
└── go.sum
```

## ■ データ取得処理仕様

- `pkg/fetcher/metadata.go` にて、以下を実装：
  - URLからHTML取得（http GET）
  - `html`パーサーでDOM構築
  - `<title>`要素の抽出
  - `<meta property="og:*">`の抽出

## ■ 生成スクリプト（例：scripts/gen_proto.sh）

```shell
#!/bin/bash

protoc \
  --go_out=../pb \
  --go-grpc_out=../pb \
  --go_opt=paths=source_relative \
  --go-grpc_opt=paths=source_relative \
  ../api/proto/article/article.proto
```

## ■ 備考

- OGPが存在しない場合、`description`, `image` は空文字列を返す
- map形式の`ogp`には `og:title`, `og:type`, `og:locale` なども含む
- HTTPリクエストでリダイレクトを追従、User-Agentを適宜偽装して取得成功率を高める実装が望ましい

