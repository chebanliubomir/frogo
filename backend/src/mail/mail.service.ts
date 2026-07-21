import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { Mail } from './interfaces/mail.interface'

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  async sendMail({ to, subject, html }: Mail) {
    await this.mailerService.sendMail({
      from: process.env.SEND_MAIL_AUTH_USER,
      to,
      subject,
      html
    })
  }
}

