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
  async updateSubLesson(id: string, sublesson: any) {
    try {
      let data: any;
      if (sublesson.change) {
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
  async deleteSubLesson(id: string, idLesson: string) {
    try {
      let data = await this.sublessonModel.findByIdAndDelete(id);
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
  async findAllSubLesson() {
    try {
      let data = await this.sublessonModel.find({});

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
