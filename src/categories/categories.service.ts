import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from './schema/categories.schema';
import { ICategories } from './interface/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModel: Model<Categories>,
  ) {}
  async createCategories(category: ICategories) {
    try {
      let data = await this.categoriesModel.create(category);
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
  async updateCategories(id: string, category: ICategories) {
    try {
      let data = await this.categoriesModel.findByIdAndUpdate(id, category, {
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
  async deleteCategories(id: string) {
    try {
      let data = await this.categoriesModel.findByIdAndDelete(id);
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
  async findAllCategories() {
    try {
      let data = await this.categoriesModel.find({});

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
  async findAllCategoriesWithCourses() {
    try {
      let data = await this.categoriesModel.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "_id",
            foreignField: "category_id",
            as: "courses",
          },
        },
      ]);

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
  async findOneCategories(id: string) {
    try {
      let data = await this.categoriesModel.findById(id);
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
}
