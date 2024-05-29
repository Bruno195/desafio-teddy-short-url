import { IFindOneUrlUsecase } from '@/domain/usecases/url/find-one-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { BadRequestError } from '@/presentation/errors/badRequest.error';

import {
  badRequest,
  ok,
  serverError,
} from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindOneResponse } from '../../../../infra/swagger/find-one.swagger';
import { UnauthorizedStatus } from '@/infra/swagger/UnauthorizedStatus';

@ApiTags('url')
@Controller('url')
export class FindOneUrlController implements IController {
  constructor(private updateUrlUsecase: IFindOneUrlUsecase) {}
  @ApiOperation({ summary: 'Find one url per user' })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the URL.',
    type: FindOneResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request: URL not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedStatus,
  })
  @Get(':id')
  async handle(
    @Param('id') id: string,
    @CurrentSessionUser() user: CurrentSessionUser,
  ): Promise<HttpResponse> {
    try {
      const { userId } = user;

      const findOne = await this.updateUrlUsecase.execute({
        userId,
        id,
      });

      if (!findOne) {
        return badRequest(new BadRequestError('Url not found'));
      }

      return ok(findOne);
    } catch (error) {
      return serverError(error);
    }
  }
}
