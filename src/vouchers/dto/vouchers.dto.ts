import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VouchersDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly end_date: string;
  @IsString()
  readonly start_date: string;
  @IsString()
  readonly discount_type: string;
  @IsNumber()
  readonly discount_value: number;
}

export class idVouchersDto {
  readonly id: string;
}
