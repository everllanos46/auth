import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/resources/env.config';
import { RolModule } from './rol/rol.module';
import { CheckClientMiddleware } from './middleware/check-client.middleware';

@Module({
  imports: [
    UserModule,
    RolModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckClientMiddleware).forRoutes('/rol');
  }
}
