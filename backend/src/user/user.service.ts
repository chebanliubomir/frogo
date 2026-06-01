import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser } from './interfaces/create-user.intarface';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/generated';
import { FindUserEnum } from '../types/find-user.enum';

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
    });
  }

  async find(data: number | string, type: FindUserEnum): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: type === FindUserEnum.ID ? Number(data) : undefined },
          { email: type === FindUserEnum.EMAIL ? String(data) : undefined },
          { resetPasswordLink: type === FindUserEnum.RESET_PASSWORD_LINK ? String(data) : undefined },
        ]
      }
    });
  }

  async activate(link: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { activatedLink: link } });
    if (!user) {
      throw new BadRequestException();
    }

    await this.prisma.user.update({
      where: { activatedLink: link },
      data: {
        activatedLink: '',
        isActivated: true
      },
    });

  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();

    if (allUsers.length <= 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Жодного користувача не знайдено.'
      });
    }

    return allUsers;
  }

}
