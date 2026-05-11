import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExeptionFilter } from './prisma/exeptions/prisma-exeption.filter';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { swaggerConfig } from './configs/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExeptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get('common.port');
  
  swaggerConfig(app);
  
  await app.listen(port);
  
  console.log(`Server was started on URL: http://localhost:${port}/api`);
}

bootstrap().catch(e => {
    console.log(`Main app bootstrap error: ${e}`);
  });
