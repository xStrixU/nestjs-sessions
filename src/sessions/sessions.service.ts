import { Injectable } from '@nestjs/common';
import { SessionData } from 'express-session';

import { CreateSessionDto } from './dtos/create-session.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SessionsService {
  constructor(private authService: AuthService) {}

  async create({ login, password }: CreateSessionDto, session: SessionData) {
    await this.authService.authenticate(login, password);

    session.login = login;
  }
}
