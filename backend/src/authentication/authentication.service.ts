import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto.js';

@Injectable()
export class AuthenticationService {

  registration({name, surname, email, password}: RegistrationDto) {
    return email
  }

}
