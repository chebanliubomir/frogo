import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthenticationService {
  constructor(private readonly user: UserService) { }

  async registration({ name, surname, email, password }: RegistrationDto) {

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = this.user.create({ name, surname, email, password: hashPassword })
    return newUser
  }

}
