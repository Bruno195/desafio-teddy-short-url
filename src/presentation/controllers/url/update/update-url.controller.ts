import { IUpdateUrlUsecase } from '@/domain/usecases/url/update-url.usecase';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { UnauthorizedStatus } from '@/infra/swagger/UnauthorizedStatus';
import { UpdateUrlResponse } from '@/infra/swagger/update.swagger';
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
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('url')
@Controller('url')
export class UpdateUrlController implements IController {
  constructor(private updateUrlUsecase: IUpdateUrlUsecase) {}

  @ApiOperation({ summary: 'Update a URL by ID' })
  @ApiParam({ name: 'id', description: 'ID of the URL to update' })
  @ApiOkResponse({
    type: UpdateUrlResponse,
  })
  @ApiResponse({ status: 200, description: 'Returns the updated URL.' })
  @ApiResponse({ status: 400, description: 'Bad request: URL not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedStatus,
  })
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
