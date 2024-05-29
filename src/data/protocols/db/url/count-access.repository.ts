import { Url } from '@/domain/models/url.model';

export abstract class ICountAccessRepository {
  abstract countAccess(
    data: CountAccessRepository.Params,
  ): Promise<CountAccessRepository.Result>;
}

export namespace CountAccessRepository {
  export type Params = Pick<Url, 'id'>;
  export type Result = void;
}
