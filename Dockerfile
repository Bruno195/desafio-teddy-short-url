
FROM node:18.20.3-alpine3.20


WORKDIR /usr/src/app


ENV NODE_ENV=production


COPY package*.json ./


RUN npm install --only=production


COPY . .




RUN npx nest build



EXPOSE 3000

