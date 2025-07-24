# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

# Accept the access token as a build argument
ARG REACT_APP_HF_API_KEY
# Optionally set it as an environment variable
ENV REACT_APP_HF_API_KEY=$REACT_APP_HF_API_KEY

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]