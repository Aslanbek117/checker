import {
    Mutation,
    Query,
    Resolver,
    ResolveProperty,
    Args
} from '@nestjs/graphql';
import { CourseModule, Course, CourseMutationModule, CourseInput } from './courses.entity';
import { CourseService } from './course.service';

@Resolver(() => CourseModule)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService,
    ) { }

    @Query(returns => CourseModule, { name: 'course' })
    getCourseModule(): CourseModule {
        return new CourseModule();
    }


    @ResolveProperty('list', type => [Course], { nullable: true, name: 'list' })
    async list(
    ): Promise<Course[]> {
        return this.courseService.getAllCourses();
    }

    @ResolveProperty('byName', type => Course, { nullable: true, name: 'byName' })
    async getByname(
        @Args('name') name: string,

    ): Promise<Course> {
        return this.courseService.getByName(name);
    }


    @Mutation(returns => CourseMutationModule, { name: 'course' })
    async getCourseMutationModule(
    ): Promise<CourseMutationModule> {
        return new CourseMutationModule();
    }

}

// tslint:disable-next-line: max-classes-per-file
@Resolver(() => CourseMutationModule)
export class CourseMutationResolver {
    constructor(
        private readonly courseService: CourseService,
    ) { }


    @ResolveProperty('create', type => Course, { nullable: true, name: 'create' })
    async createCourse(
        @Args('CourseInput') courseInput: CourseInput,
    ): Promise<Course> {
        const result = await this.courseService.save(courseInput);
        return result;
    }
}
