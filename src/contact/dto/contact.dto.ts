import { IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly subject: string;
  @IsString()
  readonly message: string;
 
  readonly status: boolean;
}

export class idContactDto {
  readonly id: string;
}
