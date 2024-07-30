import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserVouchers } from './schema/user_vouchers.schema';
import { IUserVouchers } from './interface/user_vouchers.interface';
import { User } from 'src/user/schema/user.schema';
import { Notify } from 'src/notify/schema/notify.schema';
import { Vouchers } from 'src/vouchers/schema/vouchers.schema';
import { convertToVND } from 'src/utils';

@Injectable()
export class UserVouchersService {
  constructor(
    @InjectModel(UserVouchers.name)
    private readonly UserVouchersModel: Model<UserVouchers>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
    @InjectModel(Vouchers.name) private readonly vouchersModel: Model<Vouchers>,
  ) {}
  async createUserVouchers(Uservouchers: any) {
    try {
      if (Uservouchers.type == 'all') {
        const allUserIds = await this.userModel.find({}, '_id');
        const operations = [];
        const voucher = await this.vouchersModel.findById(
          Uservouchers.body.vouchers_id[0],
        );
        for (const { _id: userId } of allUserIds) {
          const existingUserVoucher = await this.UserVouchersModel.findOne({
            user_id: [userId],
            vouchers_id: [Uservouchers.body.vouchers_id],
          });

        
        }
        await Promise.all(operations);
        return {
          status: 0,
          message: 'suceess',
        };
      } else {
        let data: any = await this.UserVouchersModel.create(Uservouchers.body);
        if (!data) {
          return {
            status: 1,
            message: 'Không lấy được dữ liệu',
          };
        }
        let vouches = await this.vouchersModel.findById(
          Uservouchers.body.vouchers_id[0],
        );
       
        return {
          status: 0,
          message: 'suceess',
          data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateUserVouchers(id: string, Uservouchers: IUserVouchers) {
    try {
      let data = await this.UserVouchersModel.findByIdAndUpdate(
        id,
        Uservouchers,
        {
          new: true,
        },
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

  async deleteUserVouchers(id: string) {
    try {
      let data = await this.UserVouchersModel.findByIdAndDelete(id);
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
  async findAllUserVouchers() {
    try {
      let data = await this.UserVouchersModel.find({})
        .find({})
        .populate(['vouchers_id', 'user_id'])
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

  async findUserVouchers(id: string) {
    try {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      let data = await this.UserVouchersModel.find({
        user_id: [id],
        status: false,
      })
        .populate(['vouchers_id'])
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
        message: 'success',
        data: filteredData,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersWithoutVoucher(voucherId: string) {
    try {
      const userVouchers = await this.UserVouchersModel.find({
        vouchers_id: [voucherId],
      });
      const userIdsWithVoucher = userVouchers.map(
        (userVoucher: any) => userVoucher.user_id[0],
      );
      const usersWithoutVoucher = await this.userModel.find({
        _id: { $nin: userIdsWithVoucher },
      });
      return {
        status: 0,
        message: 'suceess',
        data: usersWithoutVoucher,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
