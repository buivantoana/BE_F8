import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notify } from './schema/notify.schema';
import { INotify } from './interface/notify.interface';


@Injectable()
export class NotifyService {
  constructor(
    @InjectModel(Notify.name)
    private readonly notifyModel: Model<Notify>,
  ) {}
  async createNotify(notify: INotify) {
    try {
      let data = await this.notifyModel.create(notify);
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
  async updateNotify(id: string, notify: INotify) {
    try {
      let data = await this.notifyModel.findByIdAndUpdate(id, notify, {
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
  async deleteNotify(id: string) {
    try {
      let data = await this.notifyModel.findByIdAndDelete(id);
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
  async findAllNotify() {
    try {
      let data = await this.notifyModel.find({});

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
  async updateReadNotify(id: string) {
    try {
      let data = await this.notifyModel.findOneAndUpdate(
        { _id: id },
        { $set: { read: true } },
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
  async findUserNotify(id: string) {
    try {
      let data = await this.notifyModel.find({user_id:[id]});
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data:data.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
