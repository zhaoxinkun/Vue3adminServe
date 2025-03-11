import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  login(user: any) {
    const payload = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }

}
