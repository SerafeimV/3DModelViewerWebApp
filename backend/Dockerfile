# ===============================
# 1. Build stage
# ===============================
FROM gradle:8.10.2-jdk21 AS builder

WORKDIR /app

# Copy Gradle files first (better caching)
COPY build.gradle.kts settings.gradle.kts gradlew /app/
COPY gradle /app/gradle

# Download dependencies (cache layer)
RUN ./gradlew build -x test --stacktrace || return 0

# Copy source code
COPY src /app/src

# Build application
RUN ./gradlew clean bootJar -x test

# ===============================
# 2. Run stage
# ===============================
FROM eclipse-temurin:21-jdk-jammy AS runner

WORKDIR /app

# Copy built JAR from builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose backend port
EXPOSE 8081

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]