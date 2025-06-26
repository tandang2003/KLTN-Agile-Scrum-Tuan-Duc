# -------- Build Stage --------
FROM openjdk:23-jdk-slim AS builder

WORKDIR /app

# Copy only gradle wrapper first (to cache dependencies better)
COPY gradlew .
COPY gradle/wrapper gradle/wrapper

# Make the wrapper executable
RUN chmod +x gradlew

# Copy the rest of the project files
COPY . .

# Build the app and skip tests
RUN ./gradlew build -x test


# -------- Runtime Stage --------
FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

# Copy the built jar
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
