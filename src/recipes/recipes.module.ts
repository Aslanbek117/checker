import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './models/recipe.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [

    ClientsModule.register([{
      name: 'KAFKA',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: "log",
          brokers: ['127.0.0.1:9092'],
        },
        consumer: {
          groupId: "log-consumer3",
          allowAutoTopicCreation: true,
        },
        producer: {
          allowAutoTopicCreation: true,
        }
      }
    }]),
    TypeOrmModule.forFeature([Recipe])
  ],

  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule { }
