FROM node:22-alpine AS main

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

