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

@Controller('url')
export class FindOneUrlController implements IController {
  constructor(private updateUrlUsecase: IFindOneUrlUsecase) {}
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
