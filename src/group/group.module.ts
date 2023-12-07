import { Module } from '@nestjs/common';
import { GroupController } from './application/group.controller';
import { GroupService } from './Infrastructure/group.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
})
export class UserModule {}
