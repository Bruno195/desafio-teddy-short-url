import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value))
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
