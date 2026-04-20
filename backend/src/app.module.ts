import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TokensModule } from './tokens/tokens.module';
import { commonConfig, jwtConfig } from './configs/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [
        commonConfig,
        jwtConfig
      ]
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
