import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  AuthGuard,
  KeycloakConnectModule,
  KeycloakConnectOptions,
  RoleGuard,
} from 'nest-keycloak-connect';
import { keycloakConfig } from '../keycloak-config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/resources/env.config';

@Module({
  imports: [
    KeycloakConnectModule.register(keycloakConfig as KeycloakConnectOptions),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
