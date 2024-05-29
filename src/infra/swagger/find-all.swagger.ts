import { ApiProperty } from '@nestjs/swagger';
import { PropertiesFind } from './properties-find.swagger';

export class FindAllResponse {
  @ApiProperty({
    isArray: true,
    type: PropertiesFind,
  })
  body: PropertiesFind[];
}
