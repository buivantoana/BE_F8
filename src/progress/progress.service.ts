import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Courses } from 'src/courses/schema/courses.schema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';
import { Progress } from './schema/progress.schema';
import { IProgress } from './interface/progress.interface';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name)
    private readonly progressModel: Model<Progress>,
    @InjectModel(Courses.name)
    private readonly coursesModel: Model<Courses>,
  ) {}
  async createProgress(progress: IProgress) {
    try {
      let data = await this.progressModel.create(progress);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }
      await this.coursesModel.updateOne(
        { _id: progress.courses_id },
        { $push: { students: data.user_id[0] } },
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
  async findOneProgress(id: string, courses_id: string) {
    try {
      let arr = [];
      let data = await this.progressModel.find({
        user_id: [id],
      });

      data.map((item: any) => {
        if (item.courses_id[0] == courses_id) {
          return arr.push(item);
        }
      });
      console.log(arr);
      if (!data) {
        return {
          status: 1,
          message: 'failed',
        };
      }

      return {
        status: 0,
        message: 'suceess',
        data: arr,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findUserProgress(id: string) {
    try {
      let data = await this.progressModel.find({
        user_id: [id],
      });
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
  async updateProgress(id: string, progress: any) {
    try {
      let data = await this.progressModel.findByIdAndUpdate(id, progress, {
        new: true,
      });
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
  async updateCertificate(id: string, progress: any) {
    try {
      let data = await this.progressModel.findByIdAndUpdate(
        id,
        {
          $set: {
            user_name: progress.user_name,
            date_certificate: progress.date_certificate,
            status_certificate: progress.status_certificate,
          },
        }, 
        { new: true, useFindAndModify: false },
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
}
