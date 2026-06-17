import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthenticationModule } from './authentication/authentication.module'
import { commonConfig, jwtConfig, mailConfig } from './configs/common.config'
import { ExtractorModule } from './extractor/extractor.module'
import { MailModule } from './mail/mail.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { TokensModule } from './tokens/tokens.module'
import { UserModule } from './user/user.module'

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
    ExtractorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
