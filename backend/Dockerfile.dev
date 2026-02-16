FROM node:22-alpine AS main

WORKDIR /app

FROM main AS dependencies

COPY package.json tsconfig.json tsconfig.build.json yarn.lock /app/

RUN yarn install

FROM dependencies AS build

COPY ./src /app/src

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

