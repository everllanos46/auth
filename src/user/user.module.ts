import { Module } from '@nestjs/common';
import { UserController } from './application/user.controller';
import { UserService } from './Infrastructure/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
