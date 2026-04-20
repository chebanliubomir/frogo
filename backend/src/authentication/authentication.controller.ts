import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res() response: Response
  ) {
    const data = await this.authenticationService.registration(registrationDto);

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json({
      access_token: data.access_token
    });
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authenticationService.login(loginDto);

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json({
      access_token: data.access_token,
    });
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = req.cookies;
    const data = await this.authenticationService.refresh(refreshToken);

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json(data.access_token);
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = req.cookies;
    const data = await this.authenticationService.logout(refreshToken);

    response.clearCookie('refreshToken');

    return {
      data,
      message: 'You are logged out of your account.'
    };

  }

}
