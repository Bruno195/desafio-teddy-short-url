import { Url } from '@/domain/models/url.model';

export abstract class IDeleteUrlRepository {
  abstract delete(
    data: DeleteUrlRepository.Params,
  ): Promise<DeleteUrlRepository.Result>;
}

export namespace DeleteUrlRepository {
  export type Params = Pick<Url, 'userId' | 'id'>;
  export type Result = void;
}
