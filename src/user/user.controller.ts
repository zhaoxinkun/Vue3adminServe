import { Body, Controller, Get, Post } from '@nestjs/common';
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
    console.log(this.configService.get(envConfigEnum.DB_HOST));
    console.log(this.configService.get(envConfigEnum.DB_PORT));
    console.log(this.configService.get(envConfigEnum.DB_USERNAME));
    console.log(this.configService.get(envConfigEnum.DB_PASSWORD));
    console.log(this.configService.get(envConfigEnum.DB_DATABASE));
    return this.userService.GetAll();
  }

  // 创建用户
  @Post()
  // @Body 装饰器用来接收请求体中的数据（即用户传递的 username 和 password）
  createUser(@Body() users: createUserDto | createUserDto[]) {
    return this.userService.createUser(users);
  }
}
