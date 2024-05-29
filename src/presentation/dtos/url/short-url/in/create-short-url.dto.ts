import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
