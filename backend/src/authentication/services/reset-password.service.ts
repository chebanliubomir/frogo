import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'

import { MailService } from '@/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'


@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly user: UserService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService
  ) { }

  async resetPassword(email: string): Promise<string> {
    const user = await this.user.findUserEmail(email)
    if (!user) {
      throw new BadRequestException('User not found.')
    }

    const resetPasswordLink = uuid.v4()

    await this.prisma.user.update({
      where: { email },
      data: { resetPasswordLink }
    })

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `${process.env.SERVER_URL}api/authentication/reset-password/${resetPasswordLink}`
    })

    return `Letter send to ${user.email}.`

  }

  async resetPasswordLink(link: string, password: string) {
    const findUser = await this.user.findUserResetPasswordLink(link)
    if (!findUser) {
      throw new BadRequestException('The link is not valid.')
    }

    const comparisionPasswords = await bcrypt.compare(password, findUser.password)
    if(comparisionPasswords) {
      throw new BadRequestException('the password cannot be the same as the current one')
    }

    const newHashPassword = await bcrypt.hash(password, 8)

    await this.prisma.user.update({
      where: { resetPasswordLink: link },
      data: {
        resetPasswordLink: null,
        password: newHashPassword
      }
    })

    return 'The password has been successfully changed.'

  }

}
