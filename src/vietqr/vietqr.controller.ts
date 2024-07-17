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
  constructor(private vietqrServie: VietqrService) {}
  @Post('/generate-qr')
  createQrCode(@Req() req: Request, @Res() res: Response) {
    return this.vietqrServie.generateQrCode(req, res);
  }

  @Get('/banks')
  getBanks(@Req() req: Request, @Res() res: Response) {
    return this.vietqrServie.getBank( res);
  }
}
