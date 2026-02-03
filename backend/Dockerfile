FROM node:22-alpine AS build

WORKDIR /app

FROM build AS dependencies

COPY package.* tsconfig.* tsconfig.*.* yarn.lock /app/
COPY /src/ /app/

FROM dependencies AS installation

RUN yarn install

EXPOSE 3000

CMD ["yarn", "backend:start:dev"]

