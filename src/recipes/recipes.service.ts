import { Injectable, Inject } from '@nestjs/common';
import { NewRecipeInput, NewAccountInput, NewSolveInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';

var fs = require('fs');


const { c, cpp, node, python, java } = require('compile-run');


@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly bankRepo: Repository<Recipe>,
    @Inject('KAFKA')
    private readonly kafkaClient: ClientKafka,

  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async sendEvent(topic: string, message: any) {
    this.kafkaClient.emit("rmi", JSON.stringify(message)).toPromise();
  }



  async create(data: NewRecipeInput): Promise<Recipe> {
    console.log(data);
    const bankId = await this.bankRepo.create({ ...data });
    console.log(bankId);
    const save = await this.bankRepo.save(bankId);
    console.log(save);
    return save;

  }

  async solve(data: NewSolveInput): Promise<any> {
    fs.appendFile('test1.cpp', data.text
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

  async getMoney(data: NewAccountInput): Promise<Recipe> {
    // const create = await this.bankRepo.create({ ...data });
    const find = await this.bankRepo.findOne(data.id);

    const create = await this.bankRepo.create({ ...find, number: data.number });

    const money = await this.bankRepo.save(create);
    this.sendEvent('rmi', money);
    console.log(money);
    return money;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(): Promise<Recipe[]> {
    return this.bankRepo.find();
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
