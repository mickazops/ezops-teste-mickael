# syntax=docker/dockerfile:1
FROM node:14.19.3

COPY . .

RUN npm install

CMD ["node", "server.js"]

EXPOSE 3000