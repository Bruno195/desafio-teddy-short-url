import { Url } from '@/domain/models/url.model';

export abstract class IFindOriginalUrlRepositoy {
  abstract findOriginalUrl(
    data: FindOriginalUrlRepositoy.Params,
  ): Promise<FindOriginalUrlRepositoy.Result>;
}

export namespace FindOriginalUrlRepositoy {
  export type Params = Pick<Url, 'originalUrl' | 'userId'>;
  export type Result = Pick<Url, 'id' | 'shortUrl'>;
}
