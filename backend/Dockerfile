# ---------- Build ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build

# Baixa as dependências primeiro para aproveitar o cache das camadas
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B package -DskipTests

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /build/target/*.jar app.jar

# Banco SQLite e fotos ficam em /app/data (montado como volume no compose)
ENV SPRING_DATASOURCE_URL=jdbc:sqlite:/app/data/stelima.db \
    FILE_UPLOADDIR=/app/data/uploads
RUN mkdir -p /app/data/uploads
VOLUME /app/data

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
