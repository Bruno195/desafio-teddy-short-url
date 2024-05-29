import { ApiProperty } from '@nestjs/swagger';
import { PropertiesFind } from './properties-find.swagger';

export class FindOneResponse {
  @ApiProperty({
    type: PropertiesFind,
  })
  body: PropertiesFind;
}
