import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseResolver, CourseMutationResolver } from './course.resolver';
import { CourseService } from './course.service';
import { Course } from './courses.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    providers: [CourseResolver, CourseMutationResolver, CourseService],
    exports: [CourseService],
})
export class CoursesModule { }

