import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskInput, TaskPayload } from './task.entity';


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


  async solve(data: TaskInput): Promise<any> {
    fs.appendFile('test1.cpp', data.description
      , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    console.log("zaeval");

    let resultPromise = cpp.runFile('/home/aslanbek/sav/nest/sample/23-type-graphql/test1.cpp');
    resultPromise
      .then(result => {
        console.log(result);//result object
      })
      .catch(err => {
        console.log(err);
      });

    console.log(data);
    return {} as any;
  }

}
