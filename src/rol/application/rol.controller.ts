import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RolService } from '../infrastructure/rol.service';
import { Response } from 'express';
import { RolCreate } from '../domain/rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async getRoles() {
    return await this.rolService.getRoles();
  }

  @Post()
  async createRole(@Body() rolCreate: RolCreate, @Res() res: Response) {
    const response = await this.rolService.createRoles(rolCreate);
    res
      .status(Number(response.status))
      .send(response.status === 201 ? 'Rol creado' : 'No se pudo crear el rol');
  }
}
