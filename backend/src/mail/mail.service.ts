import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { mailTypes } from './types/mail.types'

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  async sendMail({ to, subject, html }: mailTypes) {
    await this.mailerService.sendMail({
      from: process.env.SEND_MAIL_AUTH_USER,
      to,
      subject,
      html
    })
  }
}

