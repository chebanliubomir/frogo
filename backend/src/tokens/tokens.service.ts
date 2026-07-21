import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Token, User } from '@prisma/generated'

import { Tokens } from './intarfaces/tokens.intarface'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class TokensService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async generateTokens(payload): Promise<Tokens> {

    const [accessToken, refreshToken] = await Promise.all([

      this.jwt.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: '1d',
      }),

      this.jwt.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: '30d',
      })
    ])

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }

  }

  async validateAccessToken(token: string): Promise<User> {
    return await this.jwt.verifyAsync(token, {secret: process.env.JWT_ACCESS_SECRET_KEY})
  }

  async validateRefreshToken(token: string): Promise<User> {
    return await this.jwt.verifyAsync(token, {secret: process.env.JWT_REFRESH_SECRET_KEY})
  }

  async searchingTokenInDataBase(token: string): Promise<Token | null> {
    return await this.prisma.token.findUnique({ where: { token: token } })
  }

  async findTokenByUsingUserId(userId: number): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: { userId } })
  }

  async saveToken(userId: number, token: string): Promise<Token | null> {
    return await this.prisma.token.upsert({
      where: { userId },
      update: { token: token },
      create: {
        userId,
        token: token,
      }
    })
  }

  async removeToken(token: string): Promise<Token | null> {
    return await this.prisma.token.delete({ where: { token: token } })
  }
}
