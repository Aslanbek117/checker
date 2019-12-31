import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, InputType, ClassType } from 'type-graphql';
import { create } from 'istanbul-reports';

export function createFolder<T extends ClassType>(returnType: T): any {
  @ObjectType({ isAbstract: true })
  abstract class FolderEntity {
  }
  return FolderEntity;
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class ErrorPayload {

  @Field()
  message!: string;

  @Field()
  type!: string;

}





// tslint:disable-next-line: max-classes-per-file
@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Column()
  @Field()
  code!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stdOut?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stdErr?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cpuUsage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  memoryUsage?: string;


  // tslint:disable-next-line: no-consecutive-blank-lines

}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class TaskInput {
  @Field()
  code!: string;
}


const BaseFolder = createFolder(Task);


// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class TaskFolder extends BaseFolder { }

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class TaskMutation { }

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class BaseTaskPayload {

  // @Field(type => Query)
  // query!: Query;
  @Field(type => TaskFolder)
  folder!: TaskFolder;

  @Field()
  status!: string;

  @Field(type => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class TaskPayload extends BaseTaskPayload {
  @Field()
  itemId!: string;

  @Field(type => Task)
  item!: Task;
}




