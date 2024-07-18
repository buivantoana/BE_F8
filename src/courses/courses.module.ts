import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesModel } from './schema/courses.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Lesson, LessonModel } from 'src/lesson/schema/lesson.chema';
import {
  SubLesson,
  SubLessonModel,
} from 'src/sublesson/schema/sublesson.schema';
import { Post, PostModel } from 'src/post/schema/post.schema';
import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }]),
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonModel }]),
    MongooseModule.forFeature([
      { name: SubLesson.name, schema: SubLessonModel },
    ]),
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionModel},
    ]),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostModel },
    ]),
    CloudinaryModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
