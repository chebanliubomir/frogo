import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) { }

  async endMail(to: string, link: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'TEST!',
      template: `http://localhost:${this.configService.get('common.port')}/api/activate/${link}`,
    });
  }

}
