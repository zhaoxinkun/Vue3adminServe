import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }


  // 生成 Access Token
  generateAccessToken(user: any) {
    const payload = { userId: user.id, username: user.username };
    return this.jwtService.sign(payload, { secret: 'my-secret-key', expiresIn: '1m' });
  }

  // 生成 Refresh Token
  generateRefreshToken(user: any) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload, { secret: 'my-refresh-secret-key', expiresIn: '7d' });
  }




}
