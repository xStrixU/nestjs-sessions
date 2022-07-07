import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRoleName } from '@prisma/client';

import { ROLES_METADATA_KEY } from './auth.constants';
import { AuthGuard } from './auth.guard';

export const Auth = (...roles: UserRoleName[]) =>
  applyDecorators(SetMetadata(ROLES_METADATA_KEY, roles), UseGuards(AuthGuard));
