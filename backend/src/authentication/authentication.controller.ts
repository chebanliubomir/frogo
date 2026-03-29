import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RegistrationEntity } from './entities/registration.entity';
import { Response } from 'express';
import { access } from 'node:fs';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @ApiOkResponse({ type: RegistrationEntity })
  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res() response: Response
  ) {
    const tokens = await this.authenticationService.registration(registrationDto)

    response.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return response.json({ access_token: tokens.access_token })

  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto)

  }

  // resetPassword() {}

  // confirmAccount() {}

  // logout() {}

}
