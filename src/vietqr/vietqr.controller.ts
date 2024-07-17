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
import { VietqrService } from './vietqr.service';

@Controller('qr_code')
export class VietQrController {

}
