import { PubSub } from 'graphql-subscriptions';
import { Task, TaskInput, TaskFolder, TaskMutation, TaskPayload, BaseTaskPayload } from './task.entity';
import { TaskService } from './task.service';
import {
  Args,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';



@Resolver(() => TaskFolder)
export class TaskResolvers {
  constructor(private readonly taskService: TaskService) { }

  @ResolveProperty('list', type => [Task])
  async getList(
  ): Promise<Task[]> {
    const result = await this.taskService.findAll();
    return result;
  }

}

// tslint:disable-next-line: max-classes-per-file
@Resolver(() => TaskMutation)
export class TaskMutationResolver {
  constructor(
    private readonly taskService: TaskService,
  ) { }



  @ResolveProperty('create', type => Task, { nullable: true, name: 'create' })
  async createTask(
    @Args('TaskInput') taskInput: TaskInput,
  ): Promise<Task> {
    const item = this.taskService.save(taskInput);
    return item;
  }

  @ResolveProperty('run', type => Task, { nullable: true, name: 'run' })
  async compile(
    @Args('TaskInput') taskInput: TaskInput,
  ): Promise<Task> {
    const result = await this.taskService.solve(taskInput);
    return result;

  }


}
