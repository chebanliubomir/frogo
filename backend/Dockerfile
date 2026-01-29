FROM node:22.20 AS main

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

