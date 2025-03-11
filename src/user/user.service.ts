import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntity } from '../log/log.entity';
import { RolesEntity } from '../roles/roles.entity';
import { conditionUtils } from '../utils/db.helper';

@Injectable()
export class UserService {

  constructor(
    // 使用操作user数据库的 Repository,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LogEntity) private readonly logRepository: Repository<LogEntity>,
    @InjectRepository(RolesEntity) private readonly rolesRepository: Repository<RolesEntity>,
  ) {
  }


  finduser() {
    return this.userRepository.find();
  }

  // 查询所有
  findAll(query: getUserDto) {
    // 解构出 query参数
    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.logs', 'logs');

    const newQuery = conditionUtils<UserEntity>(queryBuilder, obj);

    return (
      newQuery
        .take(take)
        .skip(skip)
        // .andWhere('profile.gender = :gender', { gender })
        // .andWhere('roles.id = :role', { role })
        .getMany()
    );
  }

  // 查询一个
  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  // 查询用户profile
  getUserProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        profile: true,
      },
    });
  }

  // 查询用户日志
  async getUserLogs(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        logs: true,
      },
    });
    return this.logRepository.find({
      where: {
        user: user?.logs,
      },
    });
  }

  // 创建用户
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

  // 更新用户信息
  async updateUser(id: number, user: updateUserDto) {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  // 删除用户
  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
