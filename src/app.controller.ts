import { Controller, Get } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Roles({ roles: ['user'] })
  getHello(): string {
    return 'logueado';
  }
}
