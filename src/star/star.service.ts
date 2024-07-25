import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Star } from './schema/star.schema';
import { IStar } from './interface/star.interface';

@Injectable()
export class StarService {
  constructor(
    @InjectModel(Star.name)
    private readonly starModel: Model<Star>,
  ) {}
  async createStar(star: IStar) {
    try {
      let data = await this.starModel.create(star);
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
  async updateStar(id: string, star: IStar) {
    try {
      let data = await this.starModel.findByIdAndUpdate(id, star, {
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
  

  async findAllStar() {
    try {
      let data = await this.starModel
        .find()
        .populate('courses_id')
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
  async findCoursesStar(id: string, type: any) {
    try {
      let data = await this.starModel
        .find({ courses_id: [id] })
        .populate('user_id')
        .lean()
        .exec();
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      const totalRatings = data.length;
      const ratingCounts = data.reduce((acc, { star }) => {
        acc[star] = (acc[star] || 0) + 1;
        return acc;
      }, {});
      let ratingPercentages: any;
      if (totalRatings == 0) {
        ratingPercentages = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          fire: 0,
        };
      } else {
        ratingPercentages = {
          one: Math.floor(((ratingCounts[1] || 0) / totalRatings) * 100),
          two: Math.floor(((ratingCounts[2] || 0) / totalRatings) * 100),
          three: Math.floor(((ratingCounts[3] || 0) / totalRatings) * 100),
          four: Math.floor(((ratingCounts[4] || 0) / totalRatings) * 100),
          fire: Math.floor(((ratingCounts[5] || 0) / totalRatings) * 100),
        };
      }
      const averageRating =
        ((ratingCounts[1] || 0) * 1 +
          (ratingCounts[2] || 0) * 2 +
          (ratingCounts[3] || 0) * 3 +
          (ratingCounts[4] || 0) * 4 +
          (ratingCounts[5] || 0) * 5) /
        totalRatings;
      if (type == 'all') {
        return {
          status: 0,
          message: 'suceess',
          data,
          ratingPercentages,
          averageRating,
        };
      } else {
        return {
          status: 0,
          message: 'suceess',
          averageRating,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
