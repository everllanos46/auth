import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  AuthGuard,
  KeycloakConnectModule,
  KeycloakConnectOptions,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { keycloakConfig } from '../keycloak-config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    KeycloakConnectModule.register(keycloakConfig as KeycloakConnectOptions),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
