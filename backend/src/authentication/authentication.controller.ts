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
  @SerializeOptions({ type: RegistrationEntity })
  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    const reg = await this.authenticationService.registration(registrationDto)
    console.log(reg)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto)
  }

  resetPassword() {}

  confirmAccount() {}

  logout() {}

}
