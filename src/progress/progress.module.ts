import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesModel } from 'src/courses/schema/courses.schema';
import { Progress, ProgressModel } from './schema/progress.schema';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }]),
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressModel }]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
