import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';
import { IOrder } from './interface/order.interface';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}
  async createOrder(order: IOrder) {
    try {
      let data = await this.orderModel.create(order);
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
  async updateOrder(id: string) {
    try {
      console.log(id);
      let data = await this.orderModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: true } },
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
  async deleteOrder(id: string) {
    try {
      let data = await this.orderModel.findByIdAndDelete(id);
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
  async findAllOrder() {
    try {
      let data = await this.orderModel.find({status:true}).populate([
        'courses_id'
        
      ])
      .lean()
      .exec();;

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
  async findOneOrder(id: string) {
    try {
      let data = await this.orderModel.findById(id);
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
  async findUserOrderAndCourese(courses_id: string,user_id:string) {
    try {
      let data = await this.orderModel.find({courses_id:[courses_id],user_id:[user_id]});
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
