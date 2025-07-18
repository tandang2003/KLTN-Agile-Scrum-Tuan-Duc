.PHONY: env install add freeze run

PYTHON=python3
VENV = .venv/bin/activate


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
