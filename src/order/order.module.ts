import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderModel } from './schema/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderModel },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}
