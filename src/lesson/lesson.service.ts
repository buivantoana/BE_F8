import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from './schema/lesson.chema';
import { ILesson } from './interface/lesson.interface';
import { Courses } from 'src/courses/schema/courses.schema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
    @InjectModel(Courses.name)
    private readonly coursesModel: Model<Courses>,
    @InjectModel(SubLesson.name)
    private readonly sublessonModel: Model<SubLesson>,
  ) {}
  async createLesson(lesson: ILesson) {
    try {
      let data = await this.lessonModel.create(lesson);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      await this.coursesModel.updateOne(
        { _id: lesson.courses_id[0] },
        { $push: { lesson: data._id } },
      );
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateLesson(id: string, lesson: any) {
    try {
      let data = await this.lessonModel.findByIdAndUpdate(id, lesson.lesson, {
        new: true,
      });
      if (lesson.changeCourses) {
        await this.coursesModel.updateOne(
          { _id: lesson.lesson.courses_id[0] },
          { $push: { lesson: id } },
        );
        await this.coursesModel.updateOne(
          { _id: lesson.coursesOld },
          { $pull: { lesson: id } },
        );
      }
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateArrangeLesson(id: string, lesson: any) {
    try {
      let data = await this.lessonModel.findOneAndUpdate(
        { _id: id },
        { $set: { sub_lesson: lesson } },
        { returnOriginal: false },
      );

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteLesson(id: string, idCourses: string) {
    try {
      let datadelete = await this.lessonModel.findById(id);
      if (!datadelete) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      datadelete.sub_lesson.map(async (item: any) => {
        await this.sublessonModel.findByIdAndDelete(item._id);
      });
      let data = await this.lessonModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      await this.coursesModel.updateOne(
        { _id: idCourses },
        { $pull: { lesson: id } },
      );
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findAllLesson() {
    try {
      let data = await this.lessonModel
        .find({})
        .populate('courses_id')
        .lean()
        .exec();

      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findOneLesson(id: string) {
    try {
      let data = await this.lessonModel.findById(id);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
