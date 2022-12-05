import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove fields without include in dto
      forbidNonWhitelisted: true, // return bad request if have additinal fields no expected
    }),
  );

  await app.listen(process.env.BACKEND_PORT);
  new Logger('Bootstrap').log(
    `App running on port ${process.env.BACKEND_PORT}`,
  );
}
bootstrap();
