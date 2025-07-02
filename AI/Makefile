.PHONY: env install add freeze run

PYTHON=python3

env:
	@echo "Creating virtual environment..."
	$(PYTHON) -m venv .venv
	@echo "Run 'source .venv/bin/activate' to activate the virtual environment."

install:
	. .venv/bin/activate && pip install -r requirements.txt

add:
	. .venv/bin/activate && pip install $(name)
	. .venv/bin/activate && pip freeze > requirements.txt

freeze:
	. .venv/bin/activate && pip freeze > requirements.txt

run:
	. .venv/bin/activate && $(PYTHON) -m uvicorn app.main:app --reload
