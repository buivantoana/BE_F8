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
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { JwtAuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';
import { UserVouchersService } from './user_vouchers.service';
import { UserVouchersDto, idUserVouchersDto } from './dto/user_vouchers.dto';

@Controller('user_vouchers')
export class UserUserVouchersController {
  constructor(private UserVouchersService: UserVouchersService) {}
  @Post('')
  async createUserVouchers(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    Uservouchers: any,
  ) {
    try {
      return await this.UserVouchersService.createUserVouchers(Uservouchers);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updateUserVouchers(
    @Param('id', new ValidationPipe({ transform: true })) id: idUserVouchersDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    Uservouchers: UserVouchersDto,
  ) {
    try {
      return await this.UserVouchersService.updateUserVouchers(
        String(id),
        Uservouchers,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteUserVouchers(
    @Param('id', new ValidationPipe({ transform: true })) id: idUserVouchersDto,
  ) {
    try {
      return await this.UserVouchersService.deleteUserVouchers(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllUserVouchers() {
    try {
      return await this.UserVouchersService.findAllUserVouchers();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Get('user/:id')
  async findUserVouchers(
    @Param('id', new ValidationPipe({ transform: true })) id: idUserVouchersDto,
  ) {
    try {
      return await this.UserVouchersService.findUserVouchers(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }

  @Get(':id')
  async getUsersWithoutVoucher(
    @Param('id', new ValidationPipe({ transform: true })) id: idUserVouchersDto,
  ) {
    try {
      return await this.UserVouchersService.getUsersWithoutVoucher(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
