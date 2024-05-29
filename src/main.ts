import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('/api/v1', {
    exclude: [{ method: RequestMethod.ALL, path: 'auth/(.*)' }],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
