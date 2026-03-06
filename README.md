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
Prisma initializated and installed database for development (in the backend directory):
  * dotenv -e .env.development -- yarn prisma generate
  * dotenv -e .env.development -- yarn prisma db pull
  * yarn prisma backend:prisma:seed
```

```
Prisma initializated and installed database for production (in the backend directory):
  * dotenv -e .env.production -- yarn prisma generate
  * dotenv -e .env.production -- yarn prisma db pull
```

### Step 4.
```
Starting Docker Compose in root directory: 
  * docker compose -f docker-compose.prod.yaml --env-file ./backend/.env.production up - for prodaction
  * docker compose -f docker-compose.dev.yaml --env-file ./backend/.env.development up - for development
```
