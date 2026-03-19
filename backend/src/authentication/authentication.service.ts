import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthenticationService {
  constructor(private readonly user: UserService) { }

  registration({ name, surname, email, password }: RegistrationDto) {
    const newUser = this.user.create({ name, surname, email, password })
    return newUser
  }

}
