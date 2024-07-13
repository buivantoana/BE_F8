import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVouchers } from './interface/vouchers.interface';
import { Vouchers } from './schema/vouchers.schema';
import { UserVouchers } from 'src/user_vouchers/schema/user_vouchers.schema';



@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(Vouchers.name)
    private readonly VouchersModel: Model<Vouchers>,
    @InjectModel(UserVouchers.name)
    private readonly userVouchersModel: Model<UserVouchers>,
  ) {}
  async createVouchers(vouchers: IVouchers) {
    try {
      let data = await this.VouchersModel.create(vouchers);
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
  async updateVouchers(id: string, vouchers: IVouchers) {
    try {
      let data = await this.VouchersModel.findByIdAndUpdate(id, vouchers, {
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
  async deleteVouchers(id: string) {
    try {
      let data = await this.VouchersModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      await this.userVouchersModel.deleteMany({ 'vouchers_id': id });
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findAllVouchers() {
    try {
      let data = await this.VouchersModel.find({});

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
  
  async findOneVouchers(id: string) {
    try {
      let data = await this.VouchersModel.findById(id);
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
