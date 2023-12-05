import { Module } from '@nestjs/common';
import { PermissionController } from './application/permission.controller';
import { PermissionService } from './infrastructure/permission.service';

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
