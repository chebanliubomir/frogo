import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto.js';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService
  ) { }

  async registration({name, surname, email, password}: RegistrationDto) {

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = await this.user.create({ name, surname, email, password: hashPassword })

    const payload = {
      ...newUser
    }
    
    return {
      access_token: await this.jwt.signAsync(payload)
    }

  }

  async login({email, password}: LoginDto) {

    const findUser = await this.user.findOne(email)
    if(!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Такого користувача не існує.'
      })
    }

    const checkPassword = await bcrypt.compare(password, findUser.password)
    if(!checkPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: "Невірний пароль."
      })
    }
    
    return checkPassword
  }

  resetPassword() {}

  confirmAccount() {}

  logout() {}

}
