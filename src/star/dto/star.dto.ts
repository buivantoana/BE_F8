import { IsNotEmpty, IsString } from 'class-validator';

export class StarDto {
  @IsString()
  @IsNotEmpty()
  readonly message: string;
  @IsNotEmpty()
  readonly  user_id: string[];
  @IsNotEmpty()
  readonly  courses_id: string[];
  @IsNotEmpty()
  readonly  star: number;
}

export class idStarDto {
  readonly id: string;
}
