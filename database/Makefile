.PHONY: env install add freeze dump-mysql restore-mysql restore-mongo restore-mongo-into restore-mysql-into
# Makefile for managing database operations

PYTHON=python3
VENV = .venv/bin/activate

RESTORE_SCRIPT_MONGO=src.mongo.restore
RESTORE_SCRIPT_MYSQL=src.mysql.restore
# Get the latest timestamp folder from BACKUP_DIR
DB_NAME = kltn_demo

env:
	@echo "Creating virtual environment..."
	$(PYTHON) -m venv .venv
	@echo "Activating virtual environment..."
	@echo "Run 'source .venv/bin/activate' to activate the virtual environment."
	
install:
	. $(VENV) && pip install -r requirements.txt

add:
	. $(VENV) && pip install $(name)
	. $(VENV) && pip freeze > requirements.txt

freeze:
	. $(VENV) && pip freeze > requirements.txt

dump-mysql:
	@echo "Dumping MySQL database..."
	@echo "Make sure to set the environment variables MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, and MYSQL_DATABASE."
	@echo "Running the MySQL dump script..."
	. $(VENV) && $(PYTHON) -m src.mysql.dump

restore-mysql:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mysql/*/ | tail -n 1));  \
	fi; \
	echo "♻️ Restoring from timestamp: $$ts"; \
	. $(VENV) && $(PYTHON) -m $(RESTORE_SCRIPT_MYSQL) $$ts

restore-mysql-into:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mysql/*/ | tail -n 1)); \
	fi; \
	read -p "Enter target DB name: " db; \
	echo "🔀 Merging from timestamp: $$ts into database: $$db"; \
	. $(VENV) && $(PYTHON) -m $(RESTORE_SCRIPT_MYSQL) $$ts $$db

dump-mongo:
	@echo "Dumping MongoDB database..."
	@echo "Make sure to set the environment variables MONGO_URI and MONGO_DB."
	@echo "Running the MongoDB dump script..."
	. $(VENV) && $(PYTHON) -m src.mongo.dump

restore-mongo:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mongo/*/ | tail -n 1));\
	fi; \
	echo "♻️ Restoring from timestamp: $$ts"; \
	. $(VENV) && $(PYTHON) -m $(RESTORE_SCRIPT_MONGO) $$ts

restore-mongo-into:
	@db_name="$(DB_NAME)"; \
	read -p "Enter timestamp (or type 'last'): " ts; \
	if [ "$$ts" = "last" ]; then \
		ts=$$(basename $$(ls -d $(CURDIR)/data/mongo/*/ | tail -n 1)); \
	fi; \
	read -p "Enter target DB name: " db; \
	echo "🔀 Merging from timestamp: $$ts into database: $$db"; \
	. $(VENV) && $(PYTHON) -m $(RESTORE_SCRIPT_MONGO) $$ts $$db

run:
	@echo "▶️ Running file: $(FILE)"
	. $(VENV) && PYTHONPATH=$(CURDIR) $(PYTHON) $(FILE)

run-module:
	@echo "▶️ Running module: $(MODULE)"
	. $(VENV) && PYTHONPATH=$(CURDIR) $(PYTHON) -m $(MODULE)