import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CommentsDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @IsString()
  @IsNotEmpty()
  readonly lesson_id: string;
  @IsArray()
  readonly courses_id: [];
  @IsArray()
  readonly user_id: [];
  @IsArray()
  readonly comments_child: [];
}

export class idCommentsDto {
  readonly id: string;
}
