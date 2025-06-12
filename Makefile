DC = docker compose

.PHONY: setup-minio
setup-minio:
	$(DC) exec minio sh -c "mc mb tech-stock"
