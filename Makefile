.PHONY: up down server client ai ai-docker

up:
	( \
		cd ~ && \
		make kafka_up && \
		make mysql_up && \
		make redis_up && \
		make mongo_up \
	)

down:
	( \
		cd ~ && \
		make kafka_stop && \
		make mysql_stop && \
		make redis_stop && \
		make mongo_stop \
	)

ai:
	( \
		cd ./AI && \
		make run \
	)

ai-docker:
	( \
		cd ./docker/deployment && \
		docker-compose up -d app-ai \
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
