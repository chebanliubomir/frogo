import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser } from './interfaces/create-user.intarface';
import { PrismaService } from '../prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ name, surname, email, password, activatedLink }: CreateUser) {

    const findUser = await this.prisma.user.findUnique({ where: { email } });

    if (findUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: 'Такий користувач вже існує.'
      });
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password,
        activatedLink
      }
    });

    return user;
  }

  async findUser(data: number | string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: typeof data === 'number' ? data : undefined },
          { email: typeof data === 'string' ? data : undefined }
        ]
      }
    })
  }

  async activateUser(link: string) {
    const user = await this.prisma.user.findUnique({ where: { activatedLink: link } })
    if (!user) {
      throw new BadRequestException()
    }

    await this.prisma.user.update({
      where: { activatedLink: link },
      data: {
        activatedLink: '',
        isActivated: true
      },
    })

  }

  async getAllUsers() {
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
