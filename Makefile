.PHONY: kafka db kafka-down db-down

# File paths
KAFKA_FILE=./docker/db-docker-compose.yml
KAFKA_ENV=./docker/db.env

DB_FILE=./docker/kafka-docker-compose.yml
DB_ENV=./docker/kafka.env

# Start commands
kafka:
	bash docker/scripts/up.sh $(KAFKA_FILE) $(KAFKA_ENV)

db:
	bash docker/scripts/up.sh $(DB_FILE) $(DB_ENV)

# Stop commands
kafka-down:
	bash docker/scripts/down.sh $(KAFKA_FILE) $(KAFKA_ENV)

db-down:
	bash docker/scripts/down.sh $(DB_FILE) $(DB_ENV)
