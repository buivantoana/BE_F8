import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubLesson, SubLessonModel } from './schema/sublesson.schema';
import { SubLessonController } from './sublesson.controller';
import { SubLessonService } from './sublesson.service';
import { Lesson, LessonModel } from 'src/lesson/schema/lesson.chema';
import { RolePermission, RolePermissionModel } from 'src/role_permission/schema/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubLesson.name, schema: SubLessonModel },
    ]),
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionModel},
    ]),
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonModel }]),
  ],
  controllers: [SubLessonController],
  providers: [SubLessonService],
})
export class SublessonModule {}
