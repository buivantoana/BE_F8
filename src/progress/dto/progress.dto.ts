import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class ProgressDto {
  @IsArray()
  @IsNotEmpty()
  readonly lesson_progress: any;
  @IsNotEmpty()
  readonly completed: boolean;
  @IsString()
  @IsNotEmpty()
  readonly user_id: any;
  @IsString()
  @IsNotEmpty()
  readonly courses_id: any;
}
export class idProgressDto {
  readonly id: string;
}
