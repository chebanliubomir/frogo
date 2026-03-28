import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'prisma/config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: env('JWT_SECRET_KEY'),
      signOptions: { expiresIn: 60 }
    }),
    AuthenticationModule,
    UserModule,
    PrismaModule,
    TokensModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
