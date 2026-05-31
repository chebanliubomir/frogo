import * as uuid from 'uuid';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindUserEnum } from '@/types/find-user.enum';
import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResetPasswordService {

    constructor(
      private readonly user: UserService,
      private readonly configService: ConfigService,
      private readonly mailService: MailService,
      private readonly prisma: PrismaService
    ) { }

  async resetPassword(email: string): Promise<string> {
    const user = await this.user.find(email, FindUserEnum.EMAIL);
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const resetPasswordLink = uuid.v4();

    await this.prisma.user.update({
      where: { email },
      data: { resetPasswordLink }
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `${this.configService.get('common.server_url')}api/authentication/reset-password/${resetPasswordLink}`
    });

    return `Letter send to ${user.email}.`;

  }

  async resetPasswordLink(link: string) {
    return link;
  }

}
