import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../Infrastructure/user.service';
import { Public } from 'nest-keycloak-connect';
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  @Public()
  login() {
    return this.userService.getAccessToken('admin', 'Hola123');
  }
}
