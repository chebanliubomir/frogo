import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthenticationModule } from './authentication/authentication.module'
import { commonConfig, jwtConfig, mailConfig } from './configs/common.config'
import { MailModule } from './mail/mail.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { TokensModule } from './tokens/tokens.module'
import { UserModule } from './user/user.module'
import { ExtractionModule } from './extraction/extraction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [
        commonConfig,
        jwtConfig,
        mailConfig
      ]
    }),
    AuthenticationModule,
    UserModule,
    PrismaModule,
    TokensModule,
    ConfigModule,
    MailModule,
    PostModule,
    ExtractionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
