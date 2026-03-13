import { Injectable } from '@nestjs/common';
import { ICreateUser } from './interfaces/create-user.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({name, surname, email, password}: ICreateUser) {
    const user = await this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password
      }
    }).catch(e => console.log(e))
    return user
  }

}
