import { IRedirectUrlUsecase } from '@/domain/usecases/url/redirect-url.usecase';
import { SkipAuth } from '@/infra/auth/SkipAuth';

import { redirect } from '@/presentation/helpers/http-helper';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('redirect-url')
export class RedirectUrlController implements IController {
  constructor(private redirectUrlUsecase: IRedirectUrlUsecase) {}
  @SkipAuth()
  @Get(':shortUrl')
  async handle(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<HttpResponse> {
    try {
      const getUrl = await this.redirectUrlUsecase.execute({ shortUrl });

      return redirect(res.redirect(getUrl.originalUrl));
    } catch (error) {
      return res.status(404).json({ error: 'Url not found' });
    }
  }
}
