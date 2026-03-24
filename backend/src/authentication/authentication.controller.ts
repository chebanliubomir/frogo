import { Controller, Post, Body, SerializeOptions } from '@nestjs/common';
import { AuthenticationService } from './authentication.service.js';
import { RegistrationDto } from './dto/registration.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { RegistrationEntity } from './entities/registration.entity.js';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @ApiOkResponse({ type: RegistrationEntity })
  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authenticationService.registration(registrationDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto)
  }

  resetPassword() {}

  confirmAccount() {}

  logout() {}

}
