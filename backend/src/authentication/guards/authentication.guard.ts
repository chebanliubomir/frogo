import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/generated';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) { }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest()
      const token = this.expectTokenFromHeader(request)
      if(!token) {
        throw new UnauthorizedException()
      }

      const payload = await this.checkValidToken(token);

      console.log(request)
      request['user'] = payload

    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === "Bearer" ? token : undefined
  }

  private async checkValidToken(token): Promise<User> {
    return await this.jwt.verifyAsync(token)
  }

}
