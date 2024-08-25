import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly user_name: string;
}
export class SigninDto {
  @IsString()
 
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
export class idUserDto {
  readonly id: string;
}
