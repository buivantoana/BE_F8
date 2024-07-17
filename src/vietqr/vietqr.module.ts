import { Module } from '@nestjs/common';
import { VietQrController } from './vietqr.controller';
import { VietqrService } from './vietqr.service';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Booking.name, schema: BookingModel }]),
  // ],
  controllers: [VietQrController],
  providers: [VietqrService],
})
export class VietQrModule {}
