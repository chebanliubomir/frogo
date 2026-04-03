import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'prisma/config';
import { TokensModule } from './tokens/tokens.module';
import { commonConfig } from './configs/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [
        commonConfig
      ]
    }),
    JwtModule.register({
      global: true,
      secret: env('JWT_SECRET_KEY'),
      signOptions: { expiresIn: 6000 }
    }),
    AuthenticationModule,
    UserModule,
    PrismaModule,
    TokensModule,
    ConfigModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
