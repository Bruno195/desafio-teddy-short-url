import { Url } from '@/domain/models/url.model';

export abstract class IFindByIdUrlRepository {
  abstract findbyId(
    data: FindByIdUrlRepository.Params,
  ): Promise<FindByIdUrlRepository.Result>;
}

export namespace FindByIdUrlRepository {
  export type Params = Pick<Url, 'userId' | 'id'>;
  export type Result = Omit<Url, 'userId'>;
}
