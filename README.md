# FROGO

## Tech Stack

**Client:** ReactJS, TypeScript, Redux

**Server:** NestJS, TypeScript, PrismaORM, PostgreSQL

**DevOps:** Docker

### Step 1.
```
Install dependencies to root directory: yarn install
```

### Step 2.
```
Install dependencies to backend & frontend directory: yarn install
```

### Step 3.
```
Prisma initializated and installed database (in the backend directory):
  * yarn prisma db pull - for prodaction & development
  * yarn prisma backend:prisma:seed - for development
```

### Step 4.
```
Starting Docker Compose in root directory: 
  * docker compose -f docker-compose.prod.yaml --env-file ./backend/.env.production up - for prodaction
  * docker compose -f docker-compose.dev.yaml --env-file ./backend/.env.development up - for development
```
