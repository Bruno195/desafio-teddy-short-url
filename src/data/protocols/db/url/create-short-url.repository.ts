import { Url } from '@/domain/models/url.model';

export abstract class ICreateShortUrlRepository {
  abstract create(
    data: CreateShortUrlRepository.Params,
  ): Promise<CreateShortUrlRepository.Result>;
}

export namespace CreateShortUrlRepository {
  export type Params = Pick<Url, 'userId' | 'shortUrl' | 'originalUrl'>;
  export type Result = Pick<
    Url,
    'id' | 'originalUrl' | 'shortUrl' | 'totalAccess' | 'userId'
  >;
}
