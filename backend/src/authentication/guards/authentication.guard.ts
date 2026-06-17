import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

import { TokensService } from '@/tokens/tokens.service'
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly token: TokensService) { }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest()

      const access_token = this.expectTokenFromHeader(request)
      if (!access_token) {
        throw new UnauthorizedException()
      }

      const validate = await this.token.validateAccessToken(access_token)
      if (!validate) {
        throw new UnauthorizedException()
      }

      request.user = validate
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === "Bearer" ? token : undefined
  }

}
