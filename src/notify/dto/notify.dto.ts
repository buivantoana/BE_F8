import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class NotifyDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  readonly message: string;
  @IsString()
  readonly url: string;
  @IsNotEmpty()
  readonly read: boolean;
  @IsArray()
  readonly user_id: string[];
}

export class idNotifyDto {
  readonly id: string;
}
