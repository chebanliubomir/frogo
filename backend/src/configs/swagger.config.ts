import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"


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
