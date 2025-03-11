import { Controller, Get, Injectable } from '@nestjs/common';
import { SchollService } from './scholl.service';
import { UserService } from '../user/user.service';

@Controller('scholl')
@Injectable()
export class SchollController {
  constructor(
    private schoolService: SchollService,
    private userService: UserService) {

  }

  @Get()

  getScholl() {
    return this.userService.finduser();
  }
}
