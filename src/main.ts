import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverProtocol = 'http';
  const accessServer = 'localhost';
  const port = 3000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('The Test API Description for ÜK-295 (Backend)')
    .setVersion('1.0')
    .setExternalDoc('Documentation', `/api-json`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(
    `Der Server ist jetzt erreichbar unter: ${serverProtocol}://${accessServer}:${port}`,
  );
  Logger.log(
    `Die Api Dokumentation in der Version ${config.info.version} ist erreichbar unter: ${serverProtocol}://${accessServer}:${port}/api`,
  );
}

bootstrap().then(() => Logger.log(`Server ist online!`));
