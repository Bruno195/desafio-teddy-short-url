import { IDeleteUrlUsecase } from '@/domain/usecases/url/delete-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { ok, serverError } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Controller, Delete, Param } from '@nestjs/common';

@Controller('url')
export class DeleteUrlController implements IController {
  constructor(private deleteUrlUsecase: IDeleteUrlUsecase) {}
  @Delete(':id')
  async handle(
    @Param('id') id: string,
    @CurrentSessionUser() user: CurrentSessionUser,
  ): Promise<HttpResponse> {
    try {
      const { userId } = user;

      const deleteUrl = await this.deleteUrlUsecase.execute({
        id,
        userId,
      });

      return ok(deleteUrl);
    } catch (error) {
      return serverError(error);
    }
  }
}
