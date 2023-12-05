import { Controller, Post } from '@nestjs/common';
import { UserService } from '../Infrastructure/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
}
