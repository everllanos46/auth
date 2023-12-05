import { GroupService } from './../Infrastructure/group.service';
import { Controller, Post } from '@nestjs/common';


@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}


}
