import { AppModule } from './app.module.js';
import { NestFactory } from '@nestjs/core';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map