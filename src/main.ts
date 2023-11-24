import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './share/resources/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SERVICE_DESCRIPTION,
  SERVICE_NAME,
  SERVICE_PREFIX,
  SERVICE_VERSION,
} from './share/resources/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(SERVICE_PREFIX);

  const configSwagger = new DocumentBuilder()
    .setTitle(SERVICE_NAME)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(app.get(configuration.KEY).PORT);
}
bootstrap();
