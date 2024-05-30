
FROM node:18.20.3-alpine3.20


RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app


ENV NODE_ENV=production


COPY package*.json ./


RUN npm install --only=production


COPY . .


RUN npm run build



EXPOSE 3000

