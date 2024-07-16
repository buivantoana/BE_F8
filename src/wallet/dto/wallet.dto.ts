import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WalletsDto {
  @IsNumber()
  readonly balance: number;
  @IsArray()
  readonly user_id: string[];
}

export class idWalletsDto {
  readonly id: string;
}
