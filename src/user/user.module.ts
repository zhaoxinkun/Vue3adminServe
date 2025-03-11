import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LogEntity } from '../log/log.entity';
import { RolesEntity } from '../roles/roles.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, LogEntity, RolesEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
