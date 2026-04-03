import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthenticationGuard } from './guards/authentication.guard';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res() response: Response
  ) {
    const tokens = await this.authenticationService.registration(registrationDto);

    response.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response.json({ access_token: tokens.access_token });
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const tokens = await this.authenticationService.login(loginDto);

    response.cookie('refreshToken', tokens.refresh_token);

    return response.json({ access_token: tokens.access_token })
  }

  @UseGuards(AuthenticationGuard)
  @Post('refresh')
  async refresh(
    //problem with types for Request(express)
    @Req() req
  ) {
    const user = await req.user
    const cookie = await req.cookies
    console.log(cookie)
    return await this.authenticationService.refresh(user)
  }

}
