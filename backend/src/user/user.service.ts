import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser } from './interfaces/create-user.intarface.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ name, surname, email, password }: CreateUser) {

    const findUser = await this.prisma.user.findUnique({ where: { email } })
    
    if (findUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: 'Такий користувач вже існує.'
      })
    }

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

  async findOne(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async getAllUsers() {
    const allUsers = await this.prisma.user.findMany()

    if(allUsers.length <= 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Жодного користувача не знайдено.'
      })
    }

    return allUsers
  }

}
