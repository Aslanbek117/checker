import { Module } from '@nestjs/common';
import { UserResolver, UserMutationResolver } from './user.resolver';
import { TaskModule } from './tasks/task.module'
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserMutationResolver, UserService],
  exports: [UserService],
})
export class UsersModule { }

