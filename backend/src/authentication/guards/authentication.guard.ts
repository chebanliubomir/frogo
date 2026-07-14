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
        throw new UnauthorizedException({ message: 'User is not authorized' })
      }

      const validate = await this.token.validateAccessToken(access_token)
      console.log(validate)
      if (!validate) {
        throw new UnauthorizedException({ message: 'User is not authorized' })
      }

      request.user = validate
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }
    return true
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

}
