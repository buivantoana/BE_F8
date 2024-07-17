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
import { VouchersService } from './vouchers.service';
import { VouchersDto, idVouchersDto } from './dto/vouchers.dto';

@Controller('vouchers')

export class VouchersController {
  constructor(private VouchersService: VouchersService) {}
  @Post('')
 async createVouchers(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    vouchers: VouchersDto,
  ) {
    try {
      return await this.VouchersService.createVouchers(vouchers);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  
  }
  @Put(':id')
  async updateVouchers(
    @Param('id', new ValidationPipe({ transform: true })) id: idVouchersDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    vouchers: VouchersDto,
  ) {
    try {
      return await this.VouchersService.updateVouchers(
        String(id),
        vouchers,
      );
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deleteVouchers(
    @Param('id', new ValidationPipe({ transform: true })) id: idVouchersDto,
  ) {
    try {
      return await this.VouchersService.deleteVouchers(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async findAllVouchers() {
    try {
      return await this.VouchersService.findAllVouchers();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
 
  @Get(':id')
  
}
