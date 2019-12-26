import { Field, ObjectType, InputType } from 'type-graphql';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id!: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    password!: string;

    @Column()
    @Field()
    email!: string;


}

@InputType()
export class UserInput {

    @Field()
    name!: string;

    @Field()
    password!: string;

    @Field()
    email!: string;
}



@ObjectType()
export class UserModule { }

@ObjectType()
export class UserMutationModule { }


