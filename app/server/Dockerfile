FROM python:3.12-slim AS builder

WORKDIR /app

COPY pyproject.toml requirements.txt ./
RUN pip wheel --no-cache-dir --no-deps --wheel-dir wheels -r requirements.txt

COPY src src
RUN pip wheel --no-cache-dir --no-deps --wheel-dir wheels .

FROM python:3.12-slim AS runner

COPY --from=builder /app/wheels /wheels
COPY src src

RUN pip install --no-cache /wheels/* && rm -rf /wheels

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "src.app:create_app()"]