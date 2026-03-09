import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Server was started on URL: http://localhost:${3000}/api`);
}

bootstrap()
  .then()
  .catch(e => {
    console.log(`Main app bootstrap error: ${e}`)
  })
