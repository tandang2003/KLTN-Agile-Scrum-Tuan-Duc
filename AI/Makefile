.PHONY: env install add freeze run

PYTHON=python3
VENV = .venv/bin/activate
DOCKER_REPO = ducvui2003/fast-api 

env:
	@echo "Creating virtual environment..."
	$(PYTHON) -m venv .venv
	@echo "Run 'source .venv/bin/activate' to activate the virtual environment."

install:
	. $(VENV) && pip install -r requirements.txt

add:
	. $(VENV) && pip install $(name)
	. $(VENV) && pip freeze > requirements.txt

freeze:
	. $(VENV) && pip freeze > requirements.txt

run:
	. $(VENV) && $(PYTHON) -m uvicorn app.main:app --reload

docker-build:
	@read -p "Enter tag (default: latest): " ts; \
	if [ -z "$$ts" ]; then \
		ts="latest"; \
	else \
		ts="$$ts"; \
	fi; \
	echo "Building Docker image with tag: $$ts"; \
	docker build -t $(DOCKER_REPO):$$ts .