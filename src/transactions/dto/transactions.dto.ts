import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionsDto {
  @IsString()
  readonly amount: string;
  @IsString()
  readonly status: string;
  @IsString()
  readonly type: string;
  @IsArray()
  readonly user_id: string[];
}

export class idTransactionsDto {
  readonly id: string;
}
