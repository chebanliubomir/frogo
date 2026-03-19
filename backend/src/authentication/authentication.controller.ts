import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service.js';
import { RegistrationDto } from './dto/registration.dto.js';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authenticationService.registration(registrationDto)
  }

}
