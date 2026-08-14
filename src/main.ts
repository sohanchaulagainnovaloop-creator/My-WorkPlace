import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Books Management API')
    .setDescription('API documentation for the Books Management System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = 3001;
  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger is running on http://localhost:${port}/api`);
}

bootstrap();