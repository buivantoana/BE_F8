import { Injectable } from '@nestjs/common';
import Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  constructor() {}

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    await this.client.messages.create({
      body: `Your OTP code is ${otp}`,

      to: phoneNumber,
    });
  }
}
