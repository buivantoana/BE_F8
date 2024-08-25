import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly content: string;
 
  @IsNotEmpty()
  readonly image: any;
  @IsNotEmpty()
  readonly active: boolean;
  @IsNotEmpty()
  readonly notify: boolean;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  readonly readers: string;
  @IsArray()
  readonly author: [string];
}

export class idPostDto {
  readonly id: string;
}
