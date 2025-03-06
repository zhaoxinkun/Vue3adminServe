import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 使用nest/config
import { ConfigModule, ConfigService } from '@nestjs/config';
// 配置typeorm
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// 使用joi校验
import * as Joi from 'joi';

@Module({
  imports: [UserModule,
    // 使用nest/config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // 注入实体
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // 自动扫描
        synchronize: true,
        logging: true,
      } as TypeOrmModuleOptions),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
