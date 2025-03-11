import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SchollController } from './scholl.controller';
import { SchollService } from './scholl.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from '../logger/logger.middleware';

@Module({
  imports: [UserModule],
  controllers: [SchollController],
  providers: [SchollService],
})
export class SchollModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
