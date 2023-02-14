FROM node:v18.14.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY .  .
RUN npm run build