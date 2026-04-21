import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SEND_MAIL_HOST,
        port: Number(process.env.SEND_MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.SEND_MAIL_AUTH_USER,
          pass: process.env.SEND_MAIL_AUTH_PASS,
        },
      },
    })
  ],
  providers: [MailService],
})
export class MailModule { }
