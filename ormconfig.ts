// 导入所需的实体
import { UserEntity } from './src/user/user.entity';
import { ProfileEntity } from './src/user/profile.entity';
import { LogEntity } from './src/log/log.entity';
import { RolesEntity } from './src/roles/roles.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';


export const connectionParams = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'vueserve',
  autoLoadEntities: true, // 自动加载 entity
  entities: [UserEntity, ProfileEntity, LogEntity, RolesEntity],
  synchronize: true,
  logging: ['error'],
} as TypeOrmModuleOptions;


// 使用 DataSource改造我们的ormconfig
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);