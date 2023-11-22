import { Controller, Get } from '@nestjs/common';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Roles({ roles: ['admin'], mode: RoleMatchingMode.ANY })
  @Resource('realm_access')
  getHello(): string {
    return 'logueado';
  }
}
