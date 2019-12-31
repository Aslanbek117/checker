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

    const compile_result = {
      stdout: '',
      stderr: '',
      memoryUsage: '',
      cpuUsage: '',
    }

    let resultPromise = cpp.runFile('/home/aslanbek/sav/nest/sample/23-type-graphql/test1.cpp');
    resultPromise
      .then(async result => {
        console.log(result);
        compile_result.stdout = result.stdout;
        compile_result.stderr = result.stderr;
        compile_result.memoryUsage = result.memoryUsage;
        compile_result.cpuUsage = result.cpuUsage;


      })
      .catch(err => {
        console.log(err);
      });
    // return {} as any;
    console.log("compile result", compile_result);

    const createdTask = await this.taskRepository.create({
      ...data,
      stdErr: compile_result.stderr,
      stdOut: compile_result.stdout,
      memoryUsage: compile_result.memoryUsage,
      cpuUsage: compile_result.cpuUsage,
    });
    const save = this.taskRepository.save(createdTask);
    return save;

  }

}
