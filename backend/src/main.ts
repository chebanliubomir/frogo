import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@prisma/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExeptionFilter } from './prisma/exeptions/prisma-exeption.filter';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExeptionFilter(httpAdapter))

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())
  
   const config = new DocumentBuilder()
    .setTitle('Frogo')
    .setDescription('This backend parts')
    .setVersion('1.0')
    .addTag('frogo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(env("PORT"));
  
  console.log(`Server was started on URL: http://localhost:${process.env.PORT}/api`);
}

bootstrap()
  .then()
  .catch(e => {
    console.log(`Main app bootstrap error: ${e}`)
  })
