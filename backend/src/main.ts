import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   const config = new DocumentBuilder()
    .setTitle('Frogo')
    .setDescription('This backend parts')
    .setVersion('1.0')
    .addTag('frogo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3000);
  
  console.log(`Server was started on URL: http://localhost:${3000}/api`);
}

bootstrap()
  .then()
  .catch(e => {
    console.log(`Main app bootstrap error: ${e}`)
  })
