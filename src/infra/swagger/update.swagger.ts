import { ApiProperty } from '@nestjs/swagger';

class UpdateUrlProperty {
  @ApiProperty()
  totalAccess: number;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  shortUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;
}

export class UpdateUrlResponse {
  @ApiProperty({
    type: UpdateUrlProperty,
  })
  body: UpdateUrlProperty;
}
