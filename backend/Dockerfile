# ============================================
# STAGE 1: Build the application
# ============================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first (for better caching of dependencies)
COPY pom.xml .

# Download all dependencies
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# ============================================
# STAGE 2: Create the runtime image
# ============================================
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port your application runs on
EXPOSE 8086

# Set default environment variables (can be overridden at runtime)
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=8086
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]