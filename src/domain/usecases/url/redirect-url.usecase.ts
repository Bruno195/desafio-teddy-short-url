import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class IRedirectUrlUsecase extends UseCase<
  RedirectUrl.Params,
  RedirectUrl.Result
> {}

export namespace RedirectUrl {
  export type Params = Pick<Url, 'shortUrl'>;
  export type Result = Pick<Url, 'originalUrl' | 'id'>;
}
