FROM node:22-alpine
# mistake to determining directory
WORKDIR /app

COPY package.json tsconfig.json tsconfig.build.json yarn.lock /app/

RUN yarn install

COPY src app

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

