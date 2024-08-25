import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class LessonDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly duration: number;
  @IsArray()
  readonly sub_lesson: [string];
  @IsArray()
  readonly courses_id: [string];
}
export class idLessonDto {
  readonly id: string;
}
