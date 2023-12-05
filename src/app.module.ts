import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/resources/env.config';
import { RolModule } from './rol/rol.module';
import { CheckClientMiddleware } from './middleware/check-client.middleware';
import { PermissionModule } from './Permission/permission.module';

@Module({
  imports: [
    UserModule,
    RolModule,
    PermissionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckClientMiddleware).forRoutes('/rol');
  }
}
