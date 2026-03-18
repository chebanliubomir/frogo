import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthenticationModule } from './authentication/authentication.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true
    }),
    AuthenticationModule,
    UserModule,
    PrismaModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
