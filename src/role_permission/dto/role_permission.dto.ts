import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class RolePermissionDto {
  @IsString()
  @IsNotEmpty()
  readonly role_id: string;
  @IsArray()
  readonly permission: [string];
}
export class idRolePermissionDto {
  readonly id: string;
}
