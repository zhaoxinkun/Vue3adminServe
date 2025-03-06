import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { envConfigEnum } from '../enum/env.config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
  }

  @Get()
  GetAll() {
    console.log(this.configService.get(envConfigEnum.DB_TYPE));
    return this.userService.GetAll();
  }
}
