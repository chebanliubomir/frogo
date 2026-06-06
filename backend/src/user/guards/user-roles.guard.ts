import { TokensService } from '@/tokens/tokens.service';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../user.service';
import { UserRoles } from '../decorator/user-roles.decorator';

@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private user: UserService,
    private readonly token: TokensService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get(UserRoles, context.getHandler());

      const request = context.switchToHttp().getRequest();

      const token = this.expectTokenFromHeader(request);
      if(!token) {
        throw new UnauthorizedException();
      }

      const checkValidToken = await this.token.validateAccessToken(token);
      const findUser = await this.user.findUserId(checkValidToken.id);
      if(!findUser) {
        throw new UnauthorizedException();
      }

      if(findUser.role !== roles) {
        return false;
      }

      return true;

    } catch {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }

  private expectTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
