import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
