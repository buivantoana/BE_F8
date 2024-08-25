import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubLessonDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly duration: number;
  @IsString()
  readonly type: string;
  @IsArray()
  readonly lesson: [string];
}
export class idSubLessonDto {
  readonly id: string;
}
