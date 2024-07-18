import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courses } from './schema/courses.schema';
import { ICourses } from './interface/courses.interface';
import { Lesson } from 'src/lesson/schema/lesson.chema';
import { SubLesson } from 'src/sublesson/schema/sublesson.schema';
import { Post } from 'src/post/schema/post.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name)
    private readonly coursesModel: Model<Courses>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
    @InjectModel(SubLesson.name)
    private readonly sublessonModel: Model<SubLesson>,
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}
  async createCourses(courses: ICourses) {
    try {
      let data = await this.coursesModel.create(courses);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async updateCourses(id: string, courses: any) {
    try {
      let data = await this.coursesModel.findByIdAndUpdate(id, courses, {
        new: true,
      });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async deleteCourses(id: string) {
    try {
      let datadelete = await this.coursesModel
        .findById(id)
        .populate([
          'category_id',
          {
            path: 'lesson',
            populate: {
              path: 'sub_lesson',
              model: 'SubLesson',
            },
          },
        ])
        .lean()
        .exec();
      if (!datadelete) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      datadelete.lesson.map(async (item: any) => {
        await this.lessonModel.findByIdAndDelete(item._id);
        if (item.sub_lesson[0]) {
          for (let i = 0; i < item.sub_lesson.length; i++) {
            await this.sublessonModel.findByIdAndDelete(item.sub_lesson[i]._id);
          }
        }
      });
      let data = await this.coursesModel.findByIdAndDelete(id);

      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async findAllCourses() {
    try {
      let data = await this.coursesModel
        .find({})
        .populate([
          'category_id',
          {
            path: 'lesson',
            populate: {
              path: 'sub_lesson',
              model: 'SubLesson',
            },
          },
        ])
        .lean()
        .exec();

      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async updateArrangeCourses(id: string, lesson: any) {
    try {
      let data = await this.coursesModel.findOneAndUpdate(
        { _id: id },
        { $set: { lesson: lesson } },
        { returnOriginal: false },
      );

      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async findOneCourses(id: string) {
    try {
      let data = await this.coursesModel
        .findById(id)
        .populate([
          'category_id',
          {
            path: 'lesson',
            populate: {
              path: 'sub_lesson',
              model: 'SubLesson',
            },
          },
        ])
        .lean()
        .exec();
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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
  async findMyCourses(id: string) {
    try {
      let data = await this.coursesModel
        .find({ students: id })
        .populate([
          'category_id',
          {
            path: 'lesson',
            populate: {
              path: 'sub_lesson',
              model: 'SubLesson',
            },
          },
        ])
        .lean()
        .exec();
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
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



  async searchCourses(search:any) {
    try {
       const regex = new RegExp(search, "i");
      let dataCourses = await this.coursesModel
        .find({ title: { $regex: regex } })
        .exec();

        let dataPost = await this.postModel
        .find({ title: { $regex: regex } })
        .exec();

      if (!dataCourses) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        dataCourses,
        dataPost
      };
    } catch (error) {
      console.log(error);
    }
  }
}
