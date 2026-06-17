import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/prisma/prisma.service'
import { TokensType } from '@/types/tokens.type'
import { Token, User } from '@prisma/generated'

@Injectable()
export class TokensService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private configService: ConfigService
  ) { }

  async generateTokens(payload): Promise<TokensType> {

    const [accessToken, refreshToken] = await Promise.all([

      this.jwt.sign(payload, {
        secret: this.configService.get<string>('jwt.access_secret'),
        expiresIn: '15m',
      }),

      this.jwt.sign(payload, {
        secret: this.configService.get<string>('jwt.refresh_secret'),
        expiresIn: '30d',
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }

  }

  async validateAccessToken(token: string): Promise<User> {
    return await this.jwt.verify(token, {secret: this.configService.get<string>('jwt.access_secret')})
  }

  async validateRefreshToken(token: string): Promise<User> {
    return await this.jwt.verify(token, {secret: this.configService.get<string>('jwt.refresh_secret')})
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
