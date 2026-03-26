import { Controller, Post, Body, SerializeOptions } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RegistrationEntity } from './entities/registration.entity';

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
