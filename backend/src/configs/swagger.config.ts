import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export const swaggerConfig = (app) => {

  const config = new DocumentBuilder()
    .setTitle('Frogo')
    .setDescription('This backend parts')
    .setVersion('1.0')
    .addTag('frogo')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);

}
