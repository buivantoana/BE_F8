import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(4000);
}

bootstrap();
