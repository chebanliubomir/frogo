import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RegistrationEntity } from './entities/registration.entity';
import { Response } from 'express';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @ApiOkResponse({ type: RegistrationEntity })
  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    const tokens = this.authenticationService.registration(registrationDto)

    return tokens['access_token']
    // res.cookie('refreshToken', tokens, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    //   path: '/'
    // })

  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = this.authenticationService.login(loginDto)


    return tokens

  }

  // resetPassword() {}

  // confirmAccount() {}

  // logout() {}

}
