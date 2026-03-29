import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {}
  
  async generateTokens(payload) {
    const accessToken = await this.jwt.signAsync(payload)
    const refreshToken = await this.jwt.signAsync(payload)

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }

  }
  
}
