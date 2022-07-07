import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthData } from 'express';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

import { Auth } from '../auth/auth.decorator';
import { GetAuthData } from '../auth/get-auth-data.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get('me')
  @Auth()
  getAuthenticatedUser(
    @GetAuthData() { user: { id, password, ...user }, roles }: AuthData,
  ): UserDto {
    const userDto: UserDto = { ...user, roles };

    return userDto;
  }
}
