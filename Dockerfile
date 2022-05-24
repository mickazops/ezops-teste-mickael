# syntax=docker/dockerfile:1
FROM node:12-alpine

RUN apk add --no-cache python2 g++ make

COPY . .

RUN npm install

CMD ["node", "server.js"]

EXPOSE 3000