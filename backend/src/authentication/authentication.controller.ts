import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ApiBearerAuth, ApiHeader, ApiSecurity } from '@nestjs/swagger';
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
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json({ access_token: tokens.access_token });
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authenticationService.login(loginDto);

    response.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = req.cookies;
    const data = await this.authenticationService.refresh(refreshToken);

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    response.json(data.access_token);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = req.cookies['refreshToken'];
    await this.authenticationService.logout(token);

    response.clearCookie('refreshToken');

    return 'Ви вийшли з аккаунту.';

  }


}
