import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonModel } from './schema/lesson.chema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Courses, CoursesModel } from 'src/courses/schema/courses.schema';
import {
  SubLesson,
  SubLessonModel,
} from 'src/sublesson/schema/sublesson.schema';
import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonModel }]),
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }]),
    MongooseModule.forFeature([
      { name: SubLesson.name, schema: SubLessonModel },
    ]),
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionModel},
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
