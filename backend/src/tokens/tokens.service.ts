import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {}
  
  generateTokens(payload) {
    const accessToken = this.jwt.sign(payload)
    const refreshToken = this.jwt.sign(payload)

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }

  }
  
}
