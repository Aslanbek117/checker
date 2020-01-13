import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './account/user.entity';
import { UsersModule } from './account/user.module';
import { CoursesModule } from './courses/course.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      // host: 'database-2.cm8xrz42y1wz.ap-south-1.rds.amazonaws.com',
      port: 5432,
      username: 'admin',
      // username: 'aslanbek',
      password: 'admin',
      // password: '1002574almas',
      database: 'testdb',
      // database: 'postgres',
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [__dirname + '/**/*.migration{.ts,.js}'],

    }),
    RecipesModule,
    UsersModule,
    CoursesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule { }
