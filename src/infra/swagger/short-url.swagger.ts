import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlResponseProperty {
  @ApiProperty()
  id: string;

  @ApiProperty()
  shortUrl: string;
}

export class ShortUrlResponse {
  @ApiProperty({
    type: ShortUrlResponseProperty,
  })
  body: ShortUrlResponseProperty;
}
