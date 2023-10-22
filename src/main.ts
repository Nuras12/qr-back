import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const CORS_LIST = [
  'http://localhost:3000'
]

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: CORS_LIST });
  await app.listen(8080);
}
bootstrap();
