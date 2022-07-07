import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { Session as ExpressSession, SessionData } from 'express-session';

import { CreateSessionDto } from './dtos/create-session.dto';
import { SessionsService } from './sessions.service';

import { SESSION_COOKIE_NAME } from '../app.constants';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async create(
    @Body() createSessionDto: CreateSessionDto,
    @Session() session: SessionData,
  ) {
    await this.sessionsService.create(createSessionDto, session);
  }

  @Delete()
  async delete(
    @Res({ passthrough: true }) response: Response,
    @Session() session: ExpressSession,
  ) {
    await new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(
            new InternalServerErrorException('Failed to destroy session.'),
          );
        } else {
          response.clearCookie(SESSION_COOKIE_NAME);
          resolve(undefined);
        }
      });
    });
  }
}
