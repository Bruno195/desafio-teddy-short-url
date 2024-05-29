import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedStatus {
  @ApiProperty({ default: 401 })
  statusCode: 401;

  @ApiProperty({ default: 'Unauthorized' })
  message: 'Unauthorized';
}
