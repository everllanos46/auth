import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PermissionService } from '../infrastructure/permission.service';
import { Response } from 'express';
import { Policy, PolicyEdit } from '../domain/permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('policies/:client_id')
  async getPolicies(
    @Param('client_id') client_id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.permissionService.getPolices(client_id);
      res.status(response.status).json(response.data);
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Delete('policies/:client_id/policy/:policy_id')
  async deletePolicy(
    @Param('client_id') client_id: string,
    @Param('policy_id') policy_id: string,
    @Res() res: Response,
  ) {
    try {
      await this.permissionService.deletePolicy(client_id, policy_id);
      res.status(200).send('Policy delete');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('policies/:client_id')
  async createPolicy(
    @Param('client_id') client_id: string,
    @Res() res: Response,
    @Body() policy: Policy,
  ) {
    try {
      const response = await this.permissionService.createPolicy(
        policy,
        client_id,
      );
      res.status(response.status).send('Policy create');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Put('policies/:client_id/policy/:policy_id')
  async updatePolicy(
    @Param('client_id') client_id: string,
    @Param('policy_id') policy_id: string,
    @Res() res: Response,
    @Body() policy: PolicyEdit,
  ) {
    try {
      const response = await this.permissionService.updatePolicy(
        policy,
        client_id,
        policy_id,
      );
      res.status(response.status).send('Policy update');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }
}
