import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleName } from '@prisma/client';
import { Request } from 'express';

import { ROLES_METADATA_KEY } from './auth.constants';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { login } = request.session;

    if (login) {
      const user = await this.usersService.findByLogin(login, true);

      if (user) {
        const userRoleNames = user.roles.map(({ name }) => name);
        const metadataRoleNames = this.reflector.get<UserRoleName[]>(
          ROLES_METADATA_KEY,
          context.getHandler(),
        );

        request.authData = {
          user,
          roles: userRoleNames,
        };

        return metadataRoleNames.every((roleName) =>
          userRoleNames.includes(roleName),
        );
      }
    }

    return false;
  }
}
