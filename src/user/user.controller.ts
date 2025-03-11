import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { envConfigEnum } from '../enum/env.config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';


@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    // 使用日志
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
  }


  // 查询所有用户
  @Get()
  getUsers(@Query() query:getUserDto ) {
    // 测试nest/config
    console.log(this.configService.get(envConfigEnum.DB_TYPE));
    return this.userService.findAll(query);
  }

  // 查询username
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

// 查询用户的profile
  @Get('/profile')
  getUserProfile(@Query('id') id: number) {
    return this.userService.getUserProfile(id);
  }


  // 查询用户的logs
  @Get('/logs')
  getUserLogs(@Query('id') id: number): any {
    return this.userService.getUserLogs(id);
  }


  // 创建用户
  @Post()
  // @Body 装饰器用来接收请求体中的数据（即用户传递的 username 和 password）
  createUser(@Body() users: createUserDto | createUserDto[]) {
    return this.userService.createUser(users);
  }

  // 更新用户信息
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUser: updateUserDto) {
    return this.userService.updateUser(id, updateUser);
  }

  // 删除用户
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

