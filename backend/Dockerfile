FROM node:22-alpine

WORKDIR /app

COPY package.* tsconfig.* tsconfig.*.* yarn.lock /app/
COPY src app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

