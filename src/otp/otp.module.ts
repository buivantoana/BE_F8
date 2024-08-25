import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { TwilioService } from './otp.service';

@Module({
  controllers: [OtpController],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
