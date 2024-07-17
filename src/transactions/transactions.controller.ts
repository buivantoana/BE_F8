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
import { TransactionsService } from './transactions.service';
import { TransactionsDto, idTransactionsDto } from './dto/transactions.dto';

@Controller('transaction')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  @Post('')
  async createTransactions(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    transaction: any,
  ) {
    try {
      return await this.transactionsService.createTransactions(transaction);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('status/:id')
  async updateTransactions(
    @Param('id', new ValidationPipe({ transform: true })) id: idTransactionsDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    transaction: any,
  ) {
    try {
      return await this.transactionsService.updateTransactions(
        String(id),
        transaction.status,
        transaction.type,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put('withdraw_faild/:id')
  async updateTransactionsWithdrawFaild(
    @Param('id', new ValidationPipe({ transform: true })) id: idTransactionsDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    transaction: any,
  ) {
    try {
      return await this.transactionsService.updateTransactionsWithdrawFaild(
        String(id),
        transaction,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteTransactions(
    @Param('id', new ValidationPipe({ transform: true })) id: idTransactionsDto,
  ) {
    try {
      return await this.transactionsService.deleteTransactions(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllTransactions() {
    try {
      return await this.transactionsService.findAllTransactions();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async findOneTransactions(
    @Param('id', new ValidationPipe({ transform: true })) id: idTransactionsDto,
  ) {
    try {
      return await this.transactionsService.findOneTransactions(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('user/:id')
  async findUserTransactions(
    @Param('id', new ValidationPipe({ transform: true })) id: idTransactionsDto,
  ) {
    try {
      return await this.transactionsService.findUserTransactions(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('statistical/:user_id')
  async findStatisticalTransaction(
    @Param('user_id', new ValidationPipe({ transform: true }))
    user_id: idTransactionsDto,
  ) {
    try {
      return await this.transactionsService.findStatisticalTransaction(user_id);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('statistical/admin/line')
  async findStatisticalTransactionAdmin() {
    try {
      return await this.transactionsService.findStatisticalTransactionAdmin();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
