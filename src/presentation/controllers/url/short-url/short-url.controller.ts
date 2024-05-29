import { IFindUserByIdRepository } from '@/data/protocols/db/user/find-user-by-id.repository';
import { ICreateShortUrlUsecase } from '@/domain/usecases/url/create-short-url.usecase';
import { SkipAuth } from '@/infra/auth/SkipAuth';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { ShortUrlResponse } from '@/infra/swagger/short-url.swagger';
import { CreateShortUrlDto } from '@/presentation/dtos/url/short-url/in/create-short-url.dto';
import { ForbiddenError } from '@/presentation/errors/forbidden.error';

import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Request } from 'express';

@ApiTags('short-url')
@Controller('short-url')
export class ShortUrlController implements IController {
  constructor(
    private readonly createShortUrlUsecase: ICreateShortUrlUsecase,
    private findUserByIdRepository: IFindUserByIdRepository,
  ) {}

  @SkipAuth()
  @Post()
  @ApiOperation({ summary: 'Create a short URL' })
  @ApiOkResponse({ type: ShortUrlResponse })
  @ApiResponse({ status: 200, description: 'Returns the created short URL.' })
  @ApiResponse({ status: 400, description: 'Bad request: URL not provided.' })
  @ApiResponse({ status: 403, description: 'Forbidden: User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateShortUrlDto })
  async handle(
    @Body() body: CreateShortUrlDto,
    @Req() request: Request,
    @CurrentSessionUser() user: CurrentSessionUser | undefined,
  ): Promise<HttpResponse> {
    try {
      const currentUser = user;
      console.log(user);
      const baseUrl = `${request.protocol}://${request.get('host')}`;

      if (currentUser?.userId) {
        const user = await this.findUserByIdRepository.findUserById({
          id: currentUser?.userId,
        });

        if (!user) {
          return forbidden(new ForbiddenError('user not found'));
        }
      }

      const shortUrl = await this.createShortUrlUsecase.execute({
        originalUrl: body.url,
        baseUrl,
        userId: currentUser?.userId,
      });

      return ok(shortUrl);
    } catch (error) {
      return serverError(error);
    }
  }
}
