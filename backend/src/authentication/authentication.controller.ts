import { Controller, Post, Body, Res, Redirect } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

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
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response
  ) {
    const tokens = await this.authenticationService.login(loginDto)

    response.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return response.json({ access_token: tokens.access_token })
  }

}
