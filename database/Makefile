.PHONY: env install add freeze dump-mysql restore-mysql restore-mongo restore-mongo-into restore-mysql-into
# Makefile for managing database operations

PYTHON=python3
RESTORE_SCRIPT_MONGO=src.mongo.restore
RESTORE_SCRIPT_MYSQL=src.mysql.restore
# Get the latest timestamp folder from BACKUP_DIR
DB_NAME = kltn

env:
	@echo "Creating virtual environment..."
	python -m venv venv
	@echo "Activating virtual environment..."
	@echo "Run 'source venv/bin/activate' to activate the virtual environment."
	
install:
	pip install -r requirements.txt

add:
	pip install $(name)
	pip freeze > requirements.txt

freeze:
	pip freeze > requirements.txt

dump-mysql:
	@echo "Dumping MySQL database..."
	@echo "Make sure to set the environment variables MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, and MYSQL_DATABASE."
	@echo "Running the MySQL dump script..."
	$(PYTHON) -m src.mysql.dump

restore-mysql:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mysql/*/ | tail -n 1))
	fi; \
	echo "♻️ Restoring from timestamp: $$ts"; \
	$(PYTHON) -m $(RESTORE_SCRIPT_MYSQL) $$ts

restore-mysql-into:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mysql/*/ | tail -n 1)); \
	fi; \
	read -p "Enter target DB name: " db; \
	echo "🔀 Merging from timestamp: $$ts into database: $$db"; \
	$(PYTHON) -m $(RESTORE_SCRIPT_MYSQL) $$ts $$db

dump-mongo:
	@echo "Dumping MongoDB database..."
	@echo "Make sure to set the environment variables MONGO_URI and MONGO_DB."
	@echo "Running the MongoDB dump script..."
	$(PYTHON) -m src.mongo.dump

restore-mongo:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mongo/*/ | tail -n 1))
	fi; \
	echo "♻️ Restoring from timestamp: $$ts"; \
	$(PYTHON) -m $(RESTORE_SCRIPT_MONGO) $$ts

restore-mongo-into:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mongo/*/ | tail -n 1)); \
	fi; \
	read -p "Enter target DB name: " db; \
	echo "🔀 Merging from timestamp: $$ts into database: $$db"; \
	$(PYTHON) -m $(RESTORE_SCRIPT_MONGO) $$ts $$db

