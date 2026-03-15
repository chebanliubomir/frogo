import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { env } from '@prisma/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExeptionFilter } from './prisma/exeptions/prisma-exeption.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaClientExeptionFilter())
  
   const config = new DocumentBuilder()
    .setTitle('Frogo')
    .setDescription('This backend parts')
    .setVersion('1.0')
    .addTag('frogo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(env("PORT"));
  
  console.log(`Server was started on URL: http://localhost:${env("PORT")}/api`);
}

bootstrap()
  .then()
  .catch(e => {
    console.log(`Main app bootstrap error: ${e}`)
  })
