import { Controller, Post, Body, Res, Req, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'
import { ActivateAccountUserService } from './services/activate-account-user.service'
import { AuthenticationService } from './services/authentication.service'
import { ResetPasswordService } from './services/reset-password.service'

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly activateAccountUserService: ActivateAccountUserService,
    private readonly configService: ConfigService
  ) { }

  @ApiBody({ type: RegistrationDto })
  @ApiOperation({ summary: 'Registration user' })
  @Post('registration')
  async registration(
    @Res() response: Response,
    @Body() registrationDto: RegistrationDto
  ) {
    const data = await this.authenticationService.registration(registrationDto)

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    response.json({
      access_token: data.access_token
    })
  }

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    const data = await this.authenticationService.login(loginDto)

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    response.json({
      access_token: data.access_token,
    })
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'qwqzx1485@gmail.com' }
      },
      required: ['email']
    }
  })
  @ApiOperation({ summary: 'Reset password user' })
  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return await this.resetPasswordService.resetPassword(email)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: '' }
      },
      required: ['password']
    }
  })
  @ApiOperation({ summary: 'Reset password link user' })
  @Post('reset-passowrd/:link')
  async resetPasswordLink(
    @Query('link') link: string,
    @Body('password') password: string
  ) {
    return await this.resetPasswordService.resetPasswordLink(link, password)
  }

  @ApiOperation({ summary: 'Activate user account' })
  @Get('activate/:link')
  async activate(
    @Res() response: Response,
    @Param('link') link: string
  ) {
    await this.activateAccountUserService.activate(link)
    return response.redirect(301, `${this.configService.get('common.client_url')}`)
  }

  @UseGuards(ActivateAccountUserService)
  @ApiOperation({ summary: 'Function for refresh tokens' })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = req.cookies
    const data = await this.authenticationService.refresh(refreshToken)

    response.cookie('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: false, // make to truthy for prodaction
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    response.json(data.access_token)
  }

  @UseGuards(ActivateAccountUserService)
  @ApiOperation({ summary: 'Logout user' })
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = req.cookies
    const data = await this.authenticationService.logout(refreshToken)

    response.clearCookie('refreshToken')

    return {
      data,
      message: 'You are logged out of your account.'
    }

  }

}
