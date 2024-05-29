import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class ICreateShortUrlUsecase extends UseCase<
  CreateShortUrl.Params,
  CreateShortUrl.Result
> {}

export namespace CreateShortUrl {
  export type Params = {
    originalUrl: string;
    baseUrl: string;
    userId?: string;
  };
  export type Result = Pick<Url, 'shortUrl' | 'id'>;
}
