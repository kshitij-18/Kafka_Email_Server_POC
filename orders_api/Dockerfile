FROM node:18-alpine

WORKDIR /orders_app

ENV KAFKA_HOST=localhost:9092

COPY package*.json .
RUN npm install 

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/server.js" ]