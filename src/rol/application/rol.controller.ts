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
import { RolService } from '../infrastructure/rol.service';
import { Response } from 'express';
import { RolCreate, Role } from '../domain/rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async getRoles(@Res() res: Response) {
    try {
      const response = await this.rolService.getRoles();
      res.status(response.status).json(response.data);
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post()
  async createRole(@Body() rolCreate: RolCreate, @Res() res: Response) {
    try {
      const response = await this.rolService.createRoles(rolCreate);
      res.status(response.status).send('Rol creado');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Put(':rolename')
  async editRole(
    @Param('rolename') rolename: string,
    @Body() rolEdit: RolCreate,
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.editRol(rolEdit, rolename);
      res
        .status(response.status)
        .send(
          response.status === 204
            ? 'Rol actualizado'
            : 'No se pudo editar el rol',
        );
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Delete(':rolename')
  async deleteRole(@Param('rolename') rolename: string, @Res() res: Response) {
    try {
      const response = await this.rolService.deleteRol(rolename);
      res.status(response.status).send('Rol eliminado');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('clientRole/:client_id')
  async createRoleClient(
    @Param('client_id') client_id: string,
    @Res() res: Response,
    @Body() rol: RolCreate,
  ) {
    try {
      const response = await this.rolService.createRolToClient(rol, client_id);
      res.status(response.status).send('Rol Creado');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Get('clientRole/:client_id')
  async getRolesClient(
    @Param('client_id') client_id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.getRolesClient(client_id);
      res.status(response.status).json(response.data);
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Put('clientRole/:client_id/role/:role_name')
  async editRolClient(
    @Param('client_id') client_id: string,
    @Param('role_name') role_name: string,
    @Body() rol: RolCreate,
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.editRolClient(
        rol,
        client_id,
        role_name,
      );
      res.status(response.status).send('Rol Actualizado');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Delete('clientRole/:client_id/role/:role_name')
  async deleteRolClient(
    @Param('client_id') client_id: string,
    @Param('role_name') role_name: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.deleteRolClient(
        client_id,
        role_name,
      );
      res.status(response.status).send('Rol Eliminado');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('AddUserRole/:user_id')
  async addUserToRole(
    @Param('user_id') user_id: string,
    @Body() roles: Role[],
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.addUserRealmRoles(roles, user_id);
      res.status(response.status).send('Roles agregados');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }

  @Post('AddUserClientRole/:user_id/client/:client_id')
  async addUserToClientRole(
    @Param('user_id') user_id: string,
    @Param('client_id') client_id: string,
    @Body() roles: Role[],
    @Res() res: Response,
  ) {
    try {
      const response = await this.rolService.addUserClientRoles(
        roles,
        user_id,
        client_id,
      );
      res.status(response.status).send('Roles agregados');
    } catch (e: any) {
      const { errorMessage } = e.response.data;
      res.status(e.response.status).send(errorMessage);
    }
  }
}
