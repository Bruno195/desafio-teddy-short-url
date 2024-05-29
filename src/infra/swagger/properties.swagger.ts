import { ApiProperty } from '@nestjs/swagger';

export class Properties {
  @ApiProperty()
  id: string;

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
