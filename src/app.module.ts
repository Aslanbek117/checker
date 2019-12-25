import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      host: 'database-2.cm8xrz42y1wz.ap-south-1.rds.amazonaws.com',
      port: 5432,
      // username: 'admin',
      username: 'aslanbek',
      // password: 'admin',
      password: '1002574almas',
      // database: 'testdb',
      database: 'postgres',
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [__dirname + '/**/*.migration{.ts,.js}'],
    }),
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule { }
