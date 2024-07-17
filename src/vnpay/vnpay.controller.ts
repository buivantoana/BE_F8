import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { VnPayService } from './vnpay.service';

@Controller('order')
export class VnPayController {
  constructor(private vnpayServie: VnPayService) {}
  @Post('/create_payment_url')
  createVnpay(@Req() req: Request, @Res() res: Response) {
    return this.vnpayServie.createVnpay(req, res);
  }
  @Get('/vnpay_return')
  vnpayReturn(@Req() req: Request, @Res() res: Response) {
    return this.vnpayServie.vnpayReturn(req, res);
  }
}
