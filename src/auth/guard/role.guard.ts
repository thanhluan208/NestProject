import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requireRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const isAuthenticate = requireRoles.some(
      (role) => request.user.role === role,
    );

    if (isAuthenticate) {
      return true;
    } else {
      throw new Error('You do not have permission (Roles)');
    }
    // return (Object.values(UserRole) as string[]).indexOf(user.userType) > -1;
  }
}
