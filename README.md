# 3D Model Viewer WebApp

A simple web app for displaying 3D Models in a browser.

# How to use

## Prerequisites

- Node.js
- npm
- Java SDK 21
- (optional) Docker
- IntelliJ IDEA
- PostgreSQL

## Locally

### Frontend

1. Define the environment variable `VITE_API_URL={your-backend-url}` in `./frontend/.env`
2. Run `npm install`
3. Run `npm run dev`

### Backend

1. Define the environment variables:
    - `SPRING_DATASOURCE_URL={your database url}`
    - `SPRING_DATASOURCE_USERNAME={your database username}`
    - `SPRING_DATASOURCE_PASSWORD={your database password}`
    - `SERVER_ADDRESS={your server address}`
    - `SERVER_PORT={your server port}`
    - `JWT_SECRET={your secret (must be 32 characters long)}`
    - `JWT_EXPIRATION={your expiration}`
2. Run using either `./gradlew bootRun` or through IntelliJ IDEA

## Docker

1. Define the environment variables in a `.env` file inside folder `./`:
    - `SPRING_DATASOURCE_URL=...`
    - `SPRING_DATASOURCE_USERNAME=...`
    - `SPRING_DATASOURCE_PASSWORD=...`
    - `BACKEND_HOST_PORT=...`
    - `BACKEND_CONTAINER_PORT=...`
    - `SERVER_ADDRESS=...`
    - `SERVER_PORT=...`
    - `REACT_APP_API_URL=...`
    - `FRONTEND_HOST_PORT=...`
    - `FRONTEND_CONTAINER_PORT=...`
    - `POSTGRES_DB=...`
    - `POSTGRES_USER=...`
    - `POSTGRES_PASSWORD=...`
    - `POSTGRES_HOST_PORT=...`
    - `POSTGRES_CONTAINER_PORT=...`
    - `JWT_SECRET=...`
    - `JWT_EXPIRATION=...`
2. Run `./docker-compose up`

## TODO / Ideas

1. Take a closer look at the security of the app
2. Add user role restrictions
