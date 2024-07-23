import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { OrderService } from './order.service';
import { OrderDto, idOrderDto } from './dto/order.dto';


@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('')
  async createOrder(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    order: OrderDto,
  ) {
    try {
      return await this.orderService.createOrder(order);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateOrder(
    @Param('id', new ValidationPipe({ transform: true })) id: idOrderDto,
  ) {
    try {
      return await this.orderService.updateOrder(
        String(id),
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteOrder(
    @Param('id', new ValidationPipe({ transform: true })) id: idOrderDto,
  ) {
    try {
      return await this.orderService.deleteOrder(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllOrder() {
    try {
      return await this.orderService.findAllOrder();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneOrder(
    @Param('id', new ValidationPipe({ transform: true })) id: idOrderDto,
  ) {
    try {
      return await this.orderService.findOneOrder(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('user_courses/:courses_id/:user_id')
  async findUserAndCoursesOrder(
    @Param('courses_id', new ValidationPipe({ transform: true })) courses_id: idOrderDto,
    @Param('user_id', new ValidationPipe({ transform: true })) user_id: idOrderDto,
  ) {
    try {
      return await this.orderService.findUserOrderAndCourese(String(courses_id),String(user_id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
