
FROM node:18.20.3-alpine3.20


RUN apk add --no-cache wget \
    && wget -q https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

RUN npm i -g @nestjs/cli

RUN npm install -g prisma@5.14.0

WORKDIR /usr/src/app


ENV NODE_ENV=production


COPY package*.json ./


RUN npm install --only=production



COPY . .


RUN npm run build

EXPOSE 3000

CMD dockerize -wait tcp://db:5432 -timeout 60s prisma db push && node dist/main



