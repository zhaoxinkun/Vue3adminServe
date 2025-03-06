import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    // 使用操作数据库的 Repository,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  GetAll() {
    return [
      {
        name: 'John',
        age: 20,
      },
      {
        name: 'Jane',
        age: 21,
      },
    ];
  }

  async createUser(users: createUserDto | createUserDto[]): Promise<UserEntity | UserEntity[]> {
    // 如果传入的是一个数组（多个用户）
    if (Array.isArray(users)) {
      const userEntities = users.map(user => this.userRepository.create(user)); // 创建多个用户实例
      return await this.userRepository.save(userEntities); // 批量保存
    } else {
      const user = this.userRepository.create(users); // 创建单个用户实例
      return await this.userRepository.save(user); // 保存单个用户
    }
  }
}
