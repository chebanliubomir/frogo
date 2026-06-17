import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'

import { MailService } from './mail.service'


@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        service: process.env.SEND_MAIL_SERVICE,
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
  exports: [MailService]
})
export class MailModule { }
