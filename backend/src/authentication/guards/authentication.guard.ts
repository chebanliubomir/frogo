import { TokensService } from '@/tokens/tokens.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly tokens: TokensService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = this.expectTokenFromHeader(request)
      const refresh_token = this.getRefreshTokenFromCookies(request)
      if(!access_token || !refresh_token) {
        throw new UnauthorizedException();
      }

      const validToken = await this.tokens.validateAccessToken(access_token)

      if(!validToken) {
        request['user'] = validToken
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

}
