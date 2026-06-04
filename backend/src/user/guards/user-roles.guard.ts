import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/generated';

@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => userRole !== role)
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get(Role, context.getHandler())

      if (!roles) {
        return true
      }

      const req = context.switchToHttp().getRequest()
      return this.matchRoles(roles, req.user.role)
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}
