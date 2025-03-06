import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 使用nest/config
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule,
    // 使用nest/config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
