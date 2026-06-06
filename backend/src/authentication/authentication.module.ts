import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { TokensModule } from '@/tokens/tokens.module';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ResetPasswordService } from './services/reset-password.service';
import { ActivateAccountUserService } from './services/activate-account-user.service';

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
