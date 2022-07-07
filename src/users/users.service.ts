import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({
    firstName,
    lastName,
    username,
    email,
    password,
  }: CreateUserDto) {
    const usersByUsername = await this.prisma.user.count({
      where: {
        username,
      },
    });
    const usersByEmail = await this.prisma.user.count({
      where: {
        email,
      },
    });

    if (usersByUsername || usersByEmail) {
      throw new ConflictException({
        ...(usersByUsername && {
          username: 'User with this username already exists.',
        }),
        ...(usersByEmail && { email: 'User with this email already exists.' }),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        roles: {
          create: [
            {
              name: 'USER',
            },
          ],
        },
      },
    });
  }

  findByLogin(login: string, includeRoles = false) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ username: login }, { email: login }],
      },
      include: {
        roles: includeRoles,
      },
    });
  }
}
