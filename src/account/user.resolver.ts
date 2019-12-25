import {
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Args
} from '@nestjs/graphql';
import { UserModule, UserMutationModule, User, UserInput } from './user.entity';
import { TaskFolder, TaskMutation } from './tasks/task.entity';
import { UserService } from './user.service';

@Resolver(() => UserModule)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Query(returns => UserModule, { name: 'user' })
  getUserModule(): UserModule {
    return new UserModule();
  }


  @ResolveProperty('list', type => [User], { nullable: true, name: 'list' })
  async list(
  ): Promise<User[]> {
    return this.userService.getAllUsers();
  }


  @Mutation(returns => UserMutationModule, { name: 'user' })
  async getUserMutationModule(
  ): Promise<UserMutationModule> {
    return new UserMutationModule();
  }
}

// tslint:disable-next-line: max-classes-per-file
@Resolver(() => UserMutationModule)
export class UserMutationResolver {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ResolveProperty('task', type => TaskMutation, { nullable: true, name: 'task' })
  async getTaskMutation(): Promise<TaskMutation> {
    return new TaskMutation();
  }

  @ResolveProperty('create', type => User, { nullable: true, name: 'create' })
  async createUser(
    @Args('UserInput') userInput: UserInput,
  ): Promise<User> {
    const result = await this.userService.save(userInput);
    return result;
  }
}
