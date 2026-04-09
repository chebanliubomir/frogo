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
      // const access_token = this.expectTokenFromHeader(request);
      const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYXZhdGFyIjoibnVsbCIsIm5hbWUiOiJEbWl0cml5Iiwic3VybmFtZSI6IlBldHJvdiIsImVtYWlsIjoicXdlcnR5QGdtYWlsLmNvbSIsImFjdGl2YXRlZExpbmsiOiJudWxsIiwicnVsZSI6IlVTRVIiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wMy0zMVQyMTowMjo0OC45OTFaIiwiY3JlYXRlZF9hdCI6IjIwMjYtMDMtMzFUMjE6MDI6NDguOTkxWiIsImlhdCI6MTc3NTc0OTI0MSwiZXhwIjoxNzc1NzU1MjQxfQ.3_RrYVN-1_Im9Jd8hsCd5-UGlhUaJAlz5LKqqw1u1Iw"
      const refresh_token = this.getRefreshTokenFromCookies(request);
      if(!access_token || !refresh_token) {
        throw new UnauthorizedException();
      }

      const payload = await this.checkValidToken(access_token)
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
    console.log('1', await this.jwt.verifyAsync(token))
    return await this.jwt.verifyAsync(token);
  }

}
