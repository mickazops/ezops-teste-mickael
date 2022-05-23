# syntax=docker/dockerfile:1
FROM node:12-alpine

RUN apk add --no-cache python2 g++ make

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app/server.js"]
