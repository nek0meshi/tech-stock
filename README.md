# Tech Stock

## 環境構築

### Project Root

```shell
cp docker-compose.exapmle.yml docker-compose.yml
docker compose up -d
make setup-minio
```

### Go Backend

```shell
cd go-backend
make setup
make run-server
```

### Next.js

```shell
cd frontend
pnpm prepare
pnpm dev
```
