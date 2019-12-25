import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewRecipeInput {
  @Field(type => String)
  number!: string;
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class NewAccountInput {
  @Field(type => String)
  id!: string;
  @Field(type => String)
  number: string;
}

@InputType()
export class NewSolveInput {
  @Field(type => String)
  text!: string;
}

