import { Module } from '@nestjs/common';
import { RolController } from './application/rol.controller';
import { RolService } from './infrastructure/rol.service';

@Module({
  imports: [],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
