import { TokensService } from '@/tokens/tokens.service';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/generated';
import { Request } from 'express';

@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private readonly token: TokensService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get(Role, context.getHandler())
      console.log(roles)
      const request = context.switchToHttp().getRequest()

      const token = this.expectTokenFromHeader(request)
      if(!token) {
        throw new UnauthorizedException()
      }

      //use userId from access token for find user in database and detection user role

      const checkValidToken = await this.token.validateAccessToken(token)

      console.log('role', checkValidToken.rule)

      return true

    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(request.headers)
    return type === "Bearer" ? token : undefined;
  }
}
