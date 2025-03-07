import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// 使用nest/config
import { ConfigModule } from '@nestjs/config';

// 使用joi校验
import * as Joi from 'joi';

// 使用dotenv配置
import * as dotenv from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

// 配置typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionParams } from '../ormconfig';


@Module({
  imports: [UserModule,
    // 使用nest/config
    ConfigModule.forRoot({
      // 全局使用
      isGlobal: true,
      // 配置env的path
      envFilePath,
      // 动态加载
      load: [() => dotenv.config({ path: '.env' })],
      // 使用Joi校验
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    // 配置链接typeorm
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: configService.get(envConfigEnum.DB_TYPE),
    //     host: configService.get(envConfigEnum.DB_HOST),
    //     port: configService.get(envConfigEnum.DB_PORT),
    //     username: configService.get(envConfigEnum.DB_USERNAME),
    //     password: configService.get(envConfigEnum.DB_PASSWORD),
    //     database: configService.get(envConfigEnum.DB_DATABASE),
    //     // 注入实体
    //     // entities: [UserEntity, ProfileEntity, LogEntity, RolesEntity],
    //     // 自动扫描
    //     // synchronize: true,
    //     logging: true,
    //   } as TypeOrmModuleOptions),
    // }),

    // 使用DataSource包裹
    TypeOrmModule.forRoot(connectionParams),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
