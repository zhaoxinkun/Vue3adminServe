import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  GetAll() {
    return [
      {
        name: 'John',
        age: 20,
      },
      {
        name: 'Jane',
        age: 21,
      },
    ];
  }
}
