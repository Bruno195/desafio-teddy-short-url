import { Url } from '@/domain/models/url.model';

export abstract class IFindShortUrlRepository {
  abstract findShortUrl(
    data: FindShortUrlRepositoy.Params,
  ): Promise<FindShortUrlRepositoy.Result>;
}

export namespace FindShortUrlRepositoy {
  export type Params = Pick<Url, 'shortUrl'>;
  export type Result = Pick<Url, 'id' | 'originalUrl'>;
}
