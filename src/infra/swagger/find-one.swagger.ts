import { ApiProperty } from '@nestjs/swagger';
import { Properties } from './properties.swagger';

export class FindOneResponse {
  @ApiProperty({
    type: Properties,
  })
  body: Properties;
}
