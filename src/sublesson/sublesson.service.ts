import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SubLesson } from './schema/sublesson.schema';
import { ISubLesson } from './interface/sublesson.interface';
import { Lesson } from 'src/lesson/schema/lesson.chema';

@Injectable()
export class SubLessonService {
  constructor(
    @InjectModel(SubLesson.name)
    private readonly sublessonModel: Model<SubLesson>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
  ) {}
  async createSubLesson(sublesson: any) {
    try {
      let data = await this.sublessonModel.create(sublesson);
     
      await this.lessonModel.updateOne(
        { _id: sublesson.lesson[0] },
        { $push: { sub_lesson: data._id } },
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
  async updateSubLesson(id: string, sublesson: any) {
    try {
      let data: any;
      if (sublesson.change) {
        await this.sublessonModel.findOneAndReplace(
          { _id: id },
          sublesson.body,
          { returnOriginal: false, upsert: true },
        );
      } else {
        data = await this.sublessonModel.findByIdAndUpdate(id, sublesson.body, {
          new: true,
        });
      }
      if (sublesson.changeLesson) {
        await this.lessonModel.updateOne(
          { _id: sublesson.body.lesson[0] },
          { $push: { sub_lesson: id } },
        );
        await this.lessonModel.updateOne(
          { _id: sublesson.lessonIdOld },
          { $pull: { sub_lesson: id } },
        );
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
  async deleteSubLesson(id: string, idLesson: string) {
    try {
      let data = await this.sublessonModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'khong',
        };
      }
      await this.lessonModel.updateOne(
        { _id: idLesson },
        { $pull: { sub_lesson: id } },
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

  async findOneSubLesson(id: string) {
    try {
      let data = await this.sublessonModel.findById(id);
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
