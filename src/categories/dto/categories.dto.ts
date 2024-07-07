import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  readonly description: string;
}

export class idCategoriesDto {
  readonly id: string;
}
