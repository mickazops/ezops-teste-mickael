# syntax=docker/dockerfile:1
FROM node:14-alpin

COPY . .

RUN npm install

CMD ["node", "server.js"]

EXPOSE 3000