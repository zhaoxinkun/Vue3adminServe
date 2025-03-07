import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { envConfigEnum } from '../enum/env.config';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
  }

  // 查询所有用户
  @Get()
  find() {
    console.log(this.configService.get(envConfigEnum.DB_TYPE));
    console.log(this.configService.get(envConfigEnum.DB_HOST));
    console.log(this.configService.get(envConfigEnum.DB_PORT));
    console.log(this.configService.get(envConfigEnum.DB_USERNAME));
    console.log(this.configService.get(envConfigEnum.DB_PASSWORD));
    console.log(this.configService.get(envConfigEnum.DB_DATABASE));
    return this.userService.findAll();
  }

  // 查询username
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
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

