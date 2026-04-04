import { TokensService } from '@/tokens/tokens.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/generated';
import { Request } from 'express';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
    private readonly token: TokensService
  ) { }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = this.expectTokenFromHeader(request);
      const refresh_token = this.getRefreshTokenFromCookies(request);
      if(!access_token || !refresh_token) {
        console.log('1');
        throw new UnauthorizedException();
      }

      const payload = await this.checkValidToken(access_token);
      const findRefreshTokenInTheDB = this.token.findTokenInTheDB(refresh_token);

      if(!findRefreshTokenInTheDB) {
        console.log('2');
        throw new UnauthorizedException();
      }

      request['user'] = payload;

    } catch {
      console.log('3');
      throw new UnauthorizedException();
    }
    return true;
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private getRefreshTokenFromCookies(request: Request): string | undefined {
    const [type, token] = request.cookies.refreshToken?.split('=') ?? [];
    return type === "refreshToken" ? token : undefined;

  }

  private async checkValidToken(token): Promise<User> {
    return await this.jwt.verifyAsync(token);
  }

}
