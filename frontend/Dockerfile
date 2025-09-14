# Use Node.js LTS version as base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY .. .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
ARG PORT=85
EXPOSE ${PORT}

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
