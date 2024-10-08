import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class idPermissionDto {
  readonly id: string;
}
