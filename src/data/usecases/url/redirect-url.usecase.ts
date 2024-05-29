import { ICountAccessRepository } from '@/data/protocols/db/url/count-access.repository';
import { IFindShortUrlRepository } from '@/data/protocols/db/url/find-short-url.repository';
import {
  RedirectUrl,
  IRedirectUrlUsecase,
} from '@/domain/usecases/url/redirect-url.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RedirectUrlUsecase implements IRedirectUrlUsecase {
  constructor(
    private findShortUrlRepository: IFindShortUrlRepository,
    private countAccessRepository: ICountAccessRepository,
  ) {}
  async execute(params: RedirectUrl.Params): Promise<RedirectUrl.Result> {
    const shortUrl = await this.findShortUrlRepository.findShortUrl({
      shortUrl: params.shortUrl,
    });

    await this.countAccessRepository.countAccess({
      id: shortUrl.id,
    });

    return shortUrl
      ? { id: shortUrl.id, originalUrl: shortUrl.originalUrl }
      : null;
  }
}
