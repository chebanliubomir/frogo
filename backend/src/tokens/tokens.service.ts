import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private configService: ConfigService
  ) { }

  async generateTokens(payload) {

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
    };

  }

  async validateAccessToken(token: string) {
    return await this.jwt.verify(token, {secret: this.configService.get<string>('jwt.access_secret')});
  }

  async validateRefreshToken(token: string) {
    return await this.jwt.verify(token, {secret: this.configService.get<string>('jwt.refresh_secret')});
  }

  async searchingTokenInDataBase(token: string) {
    return await this.prisma.session.findUnique({ where: { session: token } });
  }

  async findTokenByUsingUserId(userId: number) {
    return await this.prisma.session.findFirst({ where: { userId } });
  }

  async saveToken(userId: number, token: string) {
    return await this.prisma.session.upsert({
      where: { userId },
      update: { session: token },
      create: {
        userId,
        session: token,
        device: 'PC'
      }
    });
  }

  async removeToken(token: string) {
    return await this.prisma.session.delete({ where: { session: token } })
  }
}
