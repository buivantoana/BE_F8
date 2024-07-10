import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @IsString()
  @IsNotEmpty()
  readonly time: string;
  @IsArray()
  readonly sub_lesson_id: [];
  @IsArray()
  readonly courses_id: [];
  @IsArray()
  readonly user_id: [];

}

export class idNoteDto {
  readonly id: string;
}
