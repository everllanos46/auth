import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../Infrastructure/user.service';
import { UserCreate, UserEdit, UserLogin, UserReset } from '../domain/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  async getUsers(@Res() res: Response) {
    try {
      const response = await this.userService.getUsers();
      res.status(response.status).json(response.data);
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Put('users')
  async resetPassword(
    @Res() res: Response,
    @Body() user: UserReset,
  ){
    try {
      const response = await this.userService.resetPassword(user);
      res.status(response.status).send('Password Reset');
    } catch (e:any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('users')
  async createUser(
    @Res() res: Response,
    @Body() user: UserCreate,
  ){
    try {
      const response = await this.userService.createUser(user);
      res.status(response.status).send('User created');
    } catch (e:any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('users/login')
  async login(
    @Res() res: Response,
    @Body() user: UserLogin,
  ){
    try {
      const response = await this.userService.login_user(user);
      res.status(response.status).send('User created');
    } catch (e:any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Put('users/edit')
  async editUser(
    @Res() res: Response,
    @Body() user: UserEdit,
  ){
    try {
      const response = await this.userService.editUser(user);
      res.status(response.status).send('User edit');
    } catch (e:any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }
}
