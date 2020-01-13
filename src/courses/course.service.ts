import { Injectable, Options } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Course, CourseInput } from './courses.entity';
import { createScanner } from 'typescript';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async getAllCourses(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    async getByIds(ids: string[]): Promise<Course[]> {
        return this.courseRepository.findByIds(ids);
    }

    async getById(id: string): Promise<Course> {
        return this.courseRepository.findOneOrFail(id);
    }

    async getByName(courseName: string): Promise<Course> {
        return this.courseRepository.findOneOrFail({
            where: {
                name: courseName
            }
        });
    }


    async save(courseInput: CourseInput): Promise<Course> {
        const createdCourse = this.courseRepository.create(courseInput);
        return this.courseRepository.save(createdCourse);
    }
}