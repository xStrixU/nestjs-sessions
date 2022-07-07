import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const GetAuthData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authData } = ctx.switchToHttp().getRequest<Request>();

    if (!authData) {
      throw new UnauthorizedException('You are not authenticated!');
    }

    return authData;
  },
);
