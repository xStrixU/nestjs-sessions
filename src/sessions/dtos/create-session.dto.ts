import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
