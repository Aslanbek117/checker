import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskInput, TaskPayload } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getUnread(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async save(taskInput: TaskInput): Promise<Task> {
    const createdTask = this.taskRepository.create({ ...taskInput });
    const save = this.taskRepository.save(createdTask);
    return save;
  }
}
