import { Controller, Get } from '@nestjs/common';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Roles({ roles: ['Test'], mode: RoleMatchingMode.ANY })
  getHello(): string {
    return 'logueado';
  }
}
