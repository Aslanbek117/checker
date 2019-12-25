import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: "rmi",
        allowAutoTopicCreation: true,
      },

      client: {
        brokers: ['127.0.0.1:9092'],
      }
    },
  });
  app.startAllMicroservicesAsync();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3005);
}
bootstrap();
