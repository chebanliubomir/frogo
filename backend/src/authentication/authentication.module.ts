import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { TokensModule } from '@/tokens/tokens.module';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

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
  providers: [AuthenticationService, PrismaService],
})
export class AuthenticationModule { }
