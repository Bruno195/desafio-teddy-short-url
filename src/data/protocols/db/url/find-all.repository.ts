import { Url } from '@/domain/models/url.model';

export abstract class IFindAllUrlRepository {
  abstract findAll(
    data: FindAllUrlRepository.Params,
  ): Promise<FindAllUrlRepository.Result>;
}

export namespace FindAllUrlRepository {
  export type Params = Pick<Url, 'userId'>;
  export type Result = Omit<Url, 'userId'>[];
}
