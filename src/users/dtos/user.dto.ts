import { UserRoleName } from '@prisma/client';

export class UserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: UserRoleName[];
}
