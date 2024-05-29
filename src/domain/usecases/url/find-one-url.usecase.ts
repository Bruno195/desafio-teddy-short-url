import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class IFindOneUrlUsecase extends UseCase<
  FindOneUrl.Params,
  FindOneUrl.Result
> {}

export namespace FindOneUrl {
  export type Params = Pick<Url, 'id' | 'userId'>;
  export type Result = Omit<Url, 'id' | 'userId'>;
}
