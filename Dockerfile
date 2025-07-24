# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

# Accept the access token as a build argument
ARG ACCESS_TOKEN
# Optionally set it as an environment variable
ENV ACCESS_TOKEN=$ACCESS_TOKEN

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]