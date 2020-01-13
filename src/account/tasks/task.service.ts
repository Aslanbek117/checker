import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskInput, TaskPayload } from './task.entity';
import { NotSupportedError } from 'ts-morph';


var fs = require('fs');


const { c, cpp, node, python, java } = require('compile-run');

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


  async solve(data: TaskInput): Promise<Task> {
    fs.writeFile('test1.cpp', data.code
      , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });


    const compile_result = await this.compile_run(data);

    const createdTask = await this.taskRepository.create({
      ...data,
      stdErr: 'a',
      stdOut: compile_result.stdout,
      memoryUsage: compile_result.memoryUsage,
      cpuUsage: compile_result.cpuUsage,
    });
    const save = this.taskRepository.save(createdTask);
    return save;

  }

  async compile_run(code: TaskInput): Promise<any> {

    const result: Promise<any> = cpp.runFile('/home/aslanbek/aslan-home/back/checker/test1.cpp', { stdin: '3 2' });
    const ss = await result;
    console.log("ss", ss);

    return result;

  }

}
