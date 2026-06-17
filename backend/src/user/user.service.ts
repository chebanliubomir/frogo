import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUser } from './interfaces/create-user.intarface'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/generated'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ name, surname, email, password, activatedLink }: CreateUser): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password,
        activatedLink
      }
    })
  }

  async findUserId(userId: number): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { id: userId } })
  }

  async findUserEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { email } })
  }

  async findUserActivatedLink(link: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { activatedLink: link } })
  }

  async findUserResetPasswordLink(link: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { resetPasswordLink: link } })
  }

  async activate(link: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { activatedLink: link } })
    if (!user) {
      throw new BadRequestException()
    }

    await this.prisma.user.update({
      where: { activatedLink: link },
      data: {
        activatedLink: null,
        isActivated: true
      },
    })

  }

  async getAllUsers(): Promise<UserEntity[]> {
    const allUsers = await this.prisma.user.findMany()

    if (allUsers.length <= 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Жодного користувача не знайдено.'
      })
    }

    return allUsers.map((user) => new UserEntity(user))
  }

}
