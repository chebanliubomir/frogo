import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { mailTypes } from './types/mail.types'

@Injectable()
export class MailService {

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) { }

  async sendMail({ to, subject, html }: mailTypes) {
    await this.mailerService.sendMail({
      from: `${this.configService.get('mail.user')}`,
      to,
      subject,
      html
    })
  }
}

