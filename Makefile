DC = docker compose

.PHONY: up
up:
	$(DC) up

.PHONY: down
down:
	$(DC) down

.PHONY: setup-minio
setup-minio:
	$(DC) exec minio sh -c "mc mb tech-stock"
