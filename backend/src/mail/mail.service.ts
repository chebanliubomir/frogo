import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) { }

  async sendMail(to: string, link: string) {
    await this.mailerService.sendMail({
      from: `${this.configService.get('mail.user')}`,
      to,
      subject: "Test mail",
      text: "Hello world",
      html: `${this.configService.get('common.server_url')}api/activate/${link}`
    });
  }

}
