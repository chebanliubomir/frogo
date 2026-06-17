import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { swaggerConfig } from './configs/swagger.config'
import { PrismaClientExeptionFilter } from './prisma/exeptions/prisma-exeption.filter'



async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExeptionFilter(httpAdapter))

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())

  const configService = app.get(ConfigService)
  const port = configService.get('common.port')
  
  swaggerConfig(app)
  
  await app.listen(port)
  
  console.log(`Server was started on URL: http://localhost:${port}/api`)
}

bootstrap().catch(e => {
    console.log(`Main app bootstrap error: ${e}`)
  })
