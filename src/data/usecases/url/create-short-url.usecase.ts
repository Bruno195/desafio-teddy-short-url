import { ICreateShortUrlRepository } from '@/data/protocols/db/url/create-short-url.repository';
import { IFindOriginalUrlRepositoy } from '@/data/protocols/db/url/find-original-url.repositry';

import {
  CreateShortUrl,
  ICreateShortUrlUsecase,
} from '@/domain/usecases/url/create-short-url.usecase';

import { CHARACTERS } from '@/presentation/helpers/constants';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateShortUrlUsecase implements ICreateShortUrlUsecase {
  constructor(
    private createShortUrlRepository: ICreateShortUrlRepository,
    private findOriginalUrlRepositoy: IFindOriginalUrlRepositoy,
  ) {}
  async execute(data: CreateShortUrl.Params): Promise<CreateShortUrl.Result> {
    const shortUrl = this.generateShortUrl();
    const urlOriginalExists =
      await this.findOriginalUrlRepositoy.findOriginalUrl({
        originalUrl: data.originalUrl,
        userId: data.userId,
      });

    if (urlOriginalExists) {
      return {
        id: urlOriginalExists.id,
        shortUrl: `${data.baseUrl}/${urlOriginalExists.shortUrl}`,
      };
    }

    const url = await this.createShortUrlRepository.create({
      shortUrl,
      originalUrl: data.originalUrl,
      userId: data.userId,
    });

    return { id: url.id, shortUrl: `${data.baseUrl}/${url.shortUrl}` };
  }

  private generateShortUrl(length = 6): string {
    let result = '';
    const charactersLength = CHARACTERS.length;
    for (let i = 0; i < length; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
