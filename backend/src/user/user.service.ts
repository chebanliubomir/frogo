import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUser } from './interfaces/create-user.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ name, surname, email, password }: ICreateUser) {

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

  async findOne(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } })
    
    if(!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Такого користувача не існує.'
      })
    }

    return findUser

  }

}
