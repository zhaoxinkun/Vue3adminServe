import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  // 生成 Access Token
  generateAccessToken(user: any) {
    const payload = { userId: user.id, username: user.username };
    return this.jwtService.sign(payload, { secret: 'my-secret-key', expiresIn: '1h' });
  }

  // 生成 Refresh Token
  generateRefreshToken(user: any) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload, { secret: 'my-refresh-secret-key', expiresIn: '7d' });
  }

  // 登录方法中直接实现两个token的生成
  login(user: any) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // 把 Refresh Token 存储到 HttpOnly Cookie 中
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }


  // 刷新 Access Token
  refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: 'my-refresh-secret-key',
      });

      // 如果 Refresh Token 有效，生成新的 Access Token
      const user = { id: decoded.userId, username: decoded.username };
      const newAccessToken = this.generateAccessToken(user);

      return { access_token: newAccessToken };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

}
