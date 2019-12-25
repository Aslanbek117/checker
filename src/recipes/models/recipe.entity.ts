import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Recipe {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column({ length: 500, nullable: true })
  @Field({ nullable: true })
  number!: string;

}
