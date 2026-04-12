import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/generated';
import { Request } from 'express';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
  ) { }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = this.expectTokenFromHeader(request);
      const refresh_token = this.getRefreshTokenFromCookies(request);
      if(!access_token || !refresh_token) {
        throw new UnauthorizedException();
      }

      const payload = await this.checkValidToken(access_token);
      if(!payload) {
        throw new UnauthorizedException();
      }

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private getRefreshTokenFromCookies(request: Request): string | undefined {
    const token = request.cookies['refreshToken'];
    return token ? token : undefined;

  }

  private async checkValidToken(token): Promise<User> {
    console.log('1', await this.jwt.verifyAsync(token));
    return await this.jwt.verifyAsync(token);
  }

}
