import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
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
      secure: false, // make to truthy for prodaction
      maxAge: 60 * 7 * 24 * 60 * 60,
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/'
    });

    response.json({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = req.cookies['refreshToken'];
    const data = await this.authenticationService.refresh(token);

    response.cookie('refreshToken', data.session, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/'
    });

    response.json(data.user);
  }

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
