import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Desenvolvimento de API com NestJS')
    .setVersion('1.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, documentFactory, {
    jsonDocumentUrl: '/api/docs/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();