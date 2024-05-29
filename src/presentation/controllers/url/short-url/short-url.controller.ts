import { IFindUserByIdRepository } from '@/data/protocols/db/user/find-user-by-id.repository';
import { ICreateShortUrlUsecase } from '@/domain/usecases/url/create-short-url.usecase';
import { SkipAuth } from '@/infra/auth/SkipAuth';
import { CurrentSessionUser } from '@/infra/auth/currentUser.decorator';
import { CreateShortUrlDto } from '@/presentation/dtos/url/short-url/in/create-short-url.dto';
import { ForbiddenError } from '@/presentation/errors/forbidden.error';

import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { Request } from 'express';

@Controller('short-url')
export class ShortUrlController implements IController {
  constructor(
    private readonly createShortUrlUsecase: ICreateShortUrlUsecase,
    private findUserByIdRepository: IFindUserByIdRepository,
  ) {}

  @SkipAuth()
  @Post()
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
