import { Injectable, Options } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getByIds(ids: string[]): Promise<User[]> {
        return this.userRepository.findByIds(ids);
    }

    async getById(id: string): Promise<User> {
        return this.userRepository.findOneOrFail(id);
    }


    async save(userInput: UserInput): Promise<User> {
        const createdUser = this.userRepository.create(userInput);
        return this.userRepository.save(createdUser);
    }
}