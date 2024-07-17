import { Module } from '@nestjs/common';
import { VnPayController } from './vnpay.controller';
import { VnPayService } from './vnpay.service';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Booking.name, schema: BookingModel }]),
  // ],
  controllers: [VnPayController],
  providers: [VnPayService],
})
export class VnpayModule {}
