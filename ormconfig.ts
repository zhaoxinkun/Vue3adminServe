// 导入所需的实体
import { UserEntity } from './src/user/user.entity';
import { ProfileEntity } from './src/user/profile.entity';
import { LogEntity } from './src/log/log.entity';
import { RolesEntity } from './src/roles/roles.entity';

// 配置typeorm
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// 配置env
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
import { envConfigEnum } from './src/enum/env.config';

// 读取env函数
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

function buildConnerctionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV} || 'development`);
  console.log('defaultConfig', defaultConfig);
  console.log('envConfig', envConfig);
  const config = { ...defaultConfig, ...envConfig };
  console.log('config', config);
  return {
    type: config[envConfigEnum.DB_TYPE],
    host: config[envConfigEnum.DB_HOST],
    port: config[envConfigEnum.DB_PORT],
    username: config[envConfigEnum.DB_USERNAME],
    password: config[envConfigEnum.DB_PASSWORD],
    database: config[envConfigEnum.DB_DATABASE],
    autoLoadEntities: true, // 自动加载 entity
    entities: [UserEntity, ProfileEntity, LogEntity, RolesEntity],
    synchronize: true,
    logging: ['error'],
  } as TypeOrmModuleOptions;

}

export const connectionParams = buildConnerctionOptions()


// 使用 DataSource改造我们的ormconfig
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);