import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ICreateUser } from './interfaces/create-user.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({name, surname, email, password}: ICreateUser) {

    const findUser = await this.prisma.user.findUnique({ where: { email } })

    const user = await this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password
      }
    })
    return user
  }

}
