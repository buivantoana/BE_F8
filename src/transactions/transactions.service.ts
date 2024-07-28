import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from './schema/transaction.schema';
import { ITransactions } from './interface/transactions.interface';
import { Notify } from 'src/notify/schema/notify.schema';
import { convertToVND } from 'src/utils';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionsModel: Model<Transactions>,
    @InjectModel(Notify.name) private readonly notifyModel: Model<Notify>,
  ) {}
  async createTransactions(transaction: ITransactions) {
    try {
      let data = await this.transactionsModel.create(transaction);
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

  async updateTransactions(id: string, status: any, type: any) {
    try {
      let data = await this.transactionsModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: status } },
        { returnOriginal: false },
      );
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      if (type == 'rechanrge') {
        await this.notifyModel.create({
          user_id: data.user_id,
          title: 'Ví của bạn.',
          message: `Bạn vừa nạp thành công ${convertToVND(
            data.amount,
          )} vào ví của mình.`,
          url: '/my_wallet',
          read: false,
        });
      } else if (type == 'withdraw') {
        await this.notifyModel.create({
          user_id: data.user_id,
          title: 'Ví của bạn.',
          message: `Bạn vừa rút thành công ${convertToVND(
            data.amount,
          )} từ ví ví của mình .`,
          url: '/my_wallet',
          read: false,
        });
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
  async updateTransactionsWithdrawFaild(id: string, transaction: any) {
    try {
      let data = await this.transactionsModel.findOneAndReplace(
        { _id: id },
        transaction,
        { returnOriginal: false, upsert: true },
      );
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      await this.notifyModel.create({
        user_id: data.user_id,
        title: 'Ví của bạn.',
        message: `Bạn vừa rút thất bại ${convertToVND(
          data.amount,
        )} từ ví ví của mình.Ghi chú : ${data.note}`,
        url: '/my_wallet',
        read: false,
      });
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTransactions(id: string) {
    try {
      let data = await this.transactionsModel.findByIdAndDelete(id);
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
  async findAllTransactions() {
    try {
      let data = await this.transactionsModel.find({ type: 'withdraw' });

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
  async findOneTransactions(id: string) {
    try {
      let data = await this.transactionsModel.findById(id);
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
  async findUserTransactions(id: string) {
    try {
      let data = await this.transactionsModel.find({ user_id: [id] });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data: data.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findStatisticalTransaction(id: any) {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      let data = await this.transactionsModel.find({
        user_id: [id],
        status: 'completed',
        createdAt: { $gte: startOfMonth },
      });
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      console.log(data);
      let rechanrge = 0;
      let transfer = 0;
      let withdraw = 0;
      let purchase = 0;
      let reward = 0;
      data.map((item) => {
        if (item.type == 'rechanrge') {
          rechanrge += Number(item.amount);
        } else if (item.type == 'transfer') {
          transfer += Number(item.amount);
        } else if (item.type == 'withdraw') {
          withdraw += Number(item.amount);
        } else if (item.type == 'purchase') {
          purchase += Number(item.amount);
        } else if (item.type == 'reward') {
          reward += Number(item.amount);
        }
      });
      return {
        status: 0,
        message: 'suceess',
        rechanrge,
        transfer,
        withdraw,
        purchase,
        reward,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findStatisticalTransactionAdmin(date: any) {
    try {
      date = Number(date);
      const today: any = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - (date - 1));
      sevenDaysAgo.setHours(0, 0, 0, 0);

      let dataRechanrge = await this.transactionsModel.find({
        type: 'rechanrge',
        status: 'completed',
        createdAt: { $gte: sevenDaysAgo, $lte: today },
      });
      let dataWithdraw = await this.transactionsModel.find({
        type: 'withdraw',
        status: 'completed',
        createdAt: { $gte: sevenDaysAgo, $lte: today },
      });
      if (!dataRechanrge || !dataWithdraw) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      const rechanrgeTotals = Array(date).fill(0);
      const withdrawTotals = Array(date).fill(0);
      console.log(dataRechanrge);
      console.log(dataWithdraw);

      dataRechanrge.forEach((transaction: any) => {
        const transactionDate: any = new Date(
          transaction.createdAt.toDateString(),
        );
        const daysDifference = Math.floor(
          (today - transactionDate) / (1000 * 60 * 60 * 24),
        );

        if (daysDifference < date) {
          const index = date - 1 - daysDifference;
          rechanrgeTotals[index] += parseFloat(transaction.amount);
        }
      });

      dataWithdraw.forEach((transaction: any) => {
        const transactionDate: any = new Date(
          transaction.createdAt.toDateString(),
        );
        const daysDifference = Math.floor(
          (today - transactionDate) / (1000 * 60 * 60 * 24),
        );

        if (daysDifference < date) {
          const index = date - 1 - daysDifference;
          withdrawTotals[index] += parseFloat(transaction.amount);
        }
      });

      return {
        status: 0,
        message: 'suceess',
        rechanrgeTotals,
        withdrawTotals,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
