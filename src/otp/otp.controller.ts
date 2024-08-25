import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendOtp(@Body('phoneNumber') phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.twilioService.sendOtp(phoneNumber, otp);
  }
}
