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
  
}
