import { TokensService } from '@/tokens/tokens.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly token: TokensService) { }

  async canActivate(context: ExecutionContext) {
    try {
      console.log('1')
      const request = context.switchToHttp().getRequest()

      const access_token = this.expectTokenFromHeader(request)
      if (!access_token) {
        throw new UnauthorizedException();
      }
      console.log('1')

      const validate = await this.token.validateAccessToken(access_token)
      if (!validate) {
        throw new UnauthorizedException();
      }
      console.log('2')

      request.user = validate
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }

}
