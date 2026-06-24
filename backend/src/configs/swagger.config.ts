import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import type { INestApplication } from '@nestjs/common'


export const swaggerConfig = (app: INestApplication) => {

  const config = new DocumentBuilder()
    .setTitle('Frogo')
    .setDescription('backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, documentFactory)

}
