import { Url } from '@/domain/models/url.model';

export abstract class IUpdateUrlRepository {
  abstract update(
    data: UpdateUrlRepository.Params,
  ): Promise<UpdateUrlRepository.Result>;
}

export namespace UpdateUrlRepository {
  export type Params = Pick<Url, 'userId' | 'id' | 'originalUrl'>;
  export type Result = Omit<Url, 'userId'>;
}
