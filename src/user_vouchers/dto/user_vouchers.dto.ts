import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserVouchersDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
  @IsArray()
  readonly user_id: string[];
  @IsArray()
  readonly vouchers_id: string[];
}

export class idUserVouchersDto {
  readonly id: string;
}
