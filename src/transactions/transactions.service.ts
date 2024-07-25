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
  async findStatisticalTransactionAdmin() {
    try {
      const today: any = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
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
      const rechanrgeTotals = Array(7).fill(0);
      const withdrawTotals = Array(7).fill(0);
      console.log(dataRechanrge);
      console.log(dataWithdraw);

      dataRechanrge.forEach((transaction: any) => {
        const transactionDate: any = new Date(
          transaction.createdAt.toDateString(),
        );
        const daysDifference = Math.floor(
          (today - transactionDate) / (1000 * 60 * 60 * 24),
        );

        if (daysDifference < 7) {
          const index = 6 - daysDifference;
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

        if (daysDifference < 7) {
          const index = 6 - daysDifference;
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
