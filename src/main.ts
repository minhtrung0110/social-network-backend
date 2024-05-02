import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // global Validation
    new ValidationPipe({
      whitelist: true, // only allow attributes was declared in Model DTO
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  });
  await app.listen(8888);
}

bootstrap();
