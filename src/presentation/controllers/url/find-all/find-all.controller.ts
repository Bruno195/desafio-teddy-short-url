import { IFindAllUrlUsecase } from '@/domain/usecases/url/find-all-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { UnauthorizedStatus } from '@/infra/swagger/UnauthorizedStatus';

import { ok, serverError } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindAllResponse } from '../../../../infra/swagger/find-all.swagger';

@ApiTags('url')
@Controller('url')
export class FindAlltUrlController implements IController {
  constructor(private findAllUrlUsecase: IFindAllUrlUsecase) {}

  @ApiOperation({ summary: 'List all urls per user' })
  @ApiOkResponse({
    type: FindAllResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedStatus,
  })
  @Get()
  async handle(
    @CurrentSessionUser() user: CurrentSessionUser,
  ): Promise<HttpResponse> {
    try {
      const { userId } = user;

      const findAll = await this.findAllUrlUsecase.execute({
        userId,
      });

      return ok(findAll);
    } catch (error) {
      return serverError(error);
    }
  }
}
