import { IDeleteUrlUsecase } from '@/domain/usecases/url/delete-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { UnauthorizedStatus } from '@/infra/swagger/UnauthorizedStatus';
import { ok, serverError } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Controller, Delete, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('url')
@Controller('url')
export class DeleteUrlController implements IController {
  constructor(private deleteUrlUsecase: IDeleteUrlUsecase) {}
  @ApiOperation({ summary: 'Delete a URL' })
  @ApiResponse({ status: 200, description: 'URL successfully deleted.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedStatus,
  })
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
