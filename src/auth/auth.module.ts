import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule,JwtService  } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports:[
    JwtModule.register({
      secret:'my-secret-key',
      signOptions:{
        expiresIn:"1w"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,JwtService ]
})
export class AuthModule {}
