import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class idRoleDto {
  readonly id: string;
}
