.PHONY: up down server client

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