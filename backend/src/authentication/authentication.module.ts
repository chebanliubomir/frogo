import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'


import { AuthenticationController } from './authentication.controller'
import { UserModule } from '../user/user.module'
import { ActivateAccountUserService } from './services/activate-account-user.service'
import { AuthenticationService } from './services/authentication.service'
import { ResetPasswordService } from './services/reset-password.service'

import { MailModule } from '@/mail/mail.module'
import { PrismaService } from '@/prisma/prisma.service'
import { TokensModule } from '@/tokens/tokens.module'

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
    }),
    UserModule,
    TokensModule,
    MailModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService, ResetPasswordService, ActivateAccountUserService],
})
export class AuthenticationModule { }
