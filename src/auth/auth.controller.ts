import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // ✅ 这里需要注册
  ) {
  }

  @Post('login')
  login(@Body() user: any, @Res() res: Response) {
    const accessToken = this.authService.generateAccessToken(user);
    const refreshToken = this.authService.generateRefreshToken(user);
    // 将 Refresh Token 设置为 HttpOnly Cookie
    res?.cookie('refreshToken', refreshToken, {
      httpOnly: true,     // 防止 JS 获取
      secure: false,      // 生产环境下需要改成 true（https）
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return {
      message: '成功访问！',
    };
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    // 从 Cookie 中拿 Refresh Token
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('请重新登录');
    }

    try {
      // 验证 Refresh Token 是否有效
      const payload = this.jwtService.verify(refreshToken);

      // 重新签发 Access Token
      const newAccessToken = this.authService.generateAccessToken({
        id: payload.userId,
        username: payload.username,
      });

      // 返回新的 Access Token
      res.json({
        access_token: newAccessToken,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('请重新登录');
    }
  }

}
