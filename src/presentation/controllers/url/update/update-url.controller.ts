import { IUpdateUrlUsecase } from '@/domain/usecases/url/update-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { UpdateUrlDto } from '@/presentation/dtos/url/update/update.dto';
import { BadRequestError } from '@/presentation/errors/badRequest.error';
import {
  badRequest,
  ok,
  serverError,
} from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Body, Controller, Param, Put } from '@nestjs/common';

@Controller('url')
export class UpdateUrlController implements IController {
  constructor(private updateUrlUsecase: IUpdateUrlUsecase) {}
  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() body: UpdateUrlDto,
    @CurrentSessionUser() user: CurrentSessionUser,
  ): Promise<HttpResponse> {
    try {
      const { userId } = user;

      const updateUrl = await this.updateUrlUsecase.execute({
        id,
        originalUrl: body.url,
        userId,
      });

      if (!updateUrl) {
        return badRequest(new BadRequestError('Url not found'));
      }

      return ok(updateUrl);
    } catch (error) {
      return serverError(error);
    }
  }
}
