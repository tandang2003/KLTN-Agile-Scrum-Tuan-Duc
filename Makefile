.PHONY: up down server client ai

up:
	( \
		docker compose --env-file .env up -d \
	)

down:
	( \
		docker compose down \
	)

ai:
	( \
		cd ./AI && \
		make run \
	)

server:
	(\
		cd ./server && \
		./gradlew bootRun \
	)

client :
	(\
		cd ./client && \
		npm run dev \
	)
