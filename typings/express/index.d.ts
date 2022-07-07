import 'express';

import { User, UserRoleName } from '@prisma/client';

declare module 'express' {
  export interface AuthData {
    user?: User;
    roles?: UserRoleName[];
  }

  export interface Request {
    authData?: AuthData;
  }
}
