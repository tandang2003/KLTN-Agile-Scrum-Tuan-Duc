# ---- Stage 1: Build base ----
FROM python:3.12.11-slim-bullseye AS builder

# Install system dependencies for scientific libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libatlas-base-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /install

# Upgrade pip & install dependencies here to cache layers
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---- Stage 2: Runtime base ----
FROM python:3.12.11-slim-bullseye

# Set environment variables to limit CPU threads (optional optimization)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    OPENBLAS_NUM_THREADS=1 \
    MKL_NUM_THREADS=1

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Set working directory
WORKDIR /code

# Copy app and models
COPY ./app /code/app
COPY ./models /code/models

# Expose FastAPI port
EXPOSE 8080

# Run app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
