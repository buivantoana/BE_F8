import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { IWallet } from './interface/wallet.interface';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
  ) {}
  async createWallet(wallet: IWallet) {
    try {
      let data = await this.walletModel.create(wallet);
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
  async updateWallet(id: string, wallet: IWallet) {
    try {
      let data = await this.walletModel.findByIdAndUpdate(id, wallet, {
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
  async updateWalletPinCode(id: string, pin: any) {
    try {
      console.log(pin);
      if (pin.type == 'CREATE') {
        let pin_code = await bcrypt.hash(pin.pin_code, 10);
        let data = await this.walletModel.updateMany(
          { _id: id },
          { $set: { pin_code: pin_code } },
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
        };
      } else {
        let pin_code = await bcrypt.compare(pin.pin_code_new, pin.pin_code_old);

        if (!pin_code) {
          return {
            status: 1,
            message: 'Mã Pin cũ không đúng',
          };
        }
        let pin_code_new = await bcrypt.hash(pin.pin_code, 10);
        let data = await this.walletModel.updateMany(
          { _id: id },
          { $set: { pin_code: pin_code_new } },
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
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async sendPinCode(pin: any) {
    try {
      let pin_code = await bcrypt.compare(pin.pin_code_new, pin.pin_code_old);
      if (!pin_code) {
        return {
          status: 1,
          message: 'Mã Pin cũ không đúng',
        };
      }
      return {
        status: 0,
        message: 'suceess',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateRewardWallet(id: string, amount: any) {
    try {
      let data = await this.walletModel.updateOne(
        { user_id: id },
        { $inc: { balance: Number(amount) } },
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
  async deleteWallet(id: string) {
    try {
      let data = await this.walletModel.findByIdAndDelete(id);
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
  async findStatisticalWallet(user_id: any) {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      let data = await this.walletModel.find({
        user_id: [user_id],
        date: { $gte: startOfMonth },
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
  async findUserWallet(id: string) {
    try {
      let data = await this.walletModel.find({ user_id: [id] });
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
