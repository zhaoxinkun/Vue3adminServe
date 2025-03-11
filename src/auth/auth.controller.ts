import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('login')
  login(@Body() user: any) {
    return this.authService.login(user);
  }

  // 访问验证
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProFile() {
    return {
      message: 'OK',
    };
  }
}