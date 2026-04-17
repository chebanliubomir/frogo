import { PrismaService } from '@/prisma/prisma.service';
import { TokensType } from '@/types/tokens.type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async generateTokens(payload): Promise<TokensType> {

    const [accessToken, refreshToken] = await Promise.all([

      // change secret key in to env variable for accessToken
      this.jwt.signAsync(payload, {
        secret: 'access',
        expiresIn: '15m',
      }),

      // change secret key in to env variable fror refreshToken
      this.jwt.signAsync(payload, {
        secret: 'refresh',
        expiresIn: '30d',
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };

  }

  async validateAccessToken(token: string) {
    // change secret key in to env variable for accessToken
    return await this.jwt.verifyAsync(token, {secret: 'access'});
  }

  async findTokenInTheDB(token: string) {
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

}
