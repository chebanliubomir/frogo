import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.DATABASE_URL}`, '.env'],
      isGlobal: true
    }),
    UserModule,
    PrismaModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
