import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8080);
  console.log(`\n "Running on port:" http://localhost:${process.env.PORT ?? 8080} \n`);

}
bootstrap();
