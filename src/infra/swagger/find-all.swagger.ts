import { ApiProperty } from '@nestjs/swagger';
import { Properties } from './properties.swagger';

export class FindAllResponse {
  @ApiProperty({
    isArray: true,
    type: Properties,
  })
  body: Properties[];
}
