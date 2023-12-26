import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './../Infrastructure/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async createGroup(@Req() req) {
    const { headers } = req;
    const adminToken = headers.authorization.split(' ')[1];

    try {
      await this.groupService.createGroup(adminToken);
      return { message: 'Group created successfully' };
    } catch (error) {
      return { error: 'Failed to create group', details: error.message };
    }
  }

  @Get('list')
  async getGroups(@Req() req) {
    const { headers } = req;
    const adminToken = headers.authorization.split(' ')[1];

    try {
      const groups = await this.groupService.getGroups(adminToken);
      return { groups };
    } catch (error) {
      return { error: 'Failed to retrieve groups', details: error.message };
    }
  }
}
