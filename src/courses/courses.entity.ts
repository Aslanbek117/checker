import { Field, ObjectType, InputType } from 'type-graphql';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id!: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    description!: string;

    @Column()
    @Field()
    image!: string;

}

@InputType()
export class CourseInput {

    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    image!: string;

}



@ObjectType()
export class CourseModule { }

@ObjectType()
export class CourseMutationModule { }


