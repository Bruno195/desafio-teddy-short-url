import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class IDeleteUrlUsecase extends UseCase<
  DeleteUrl.Params,
  DeleteUrl.Result
> {}

export namespace DeleteUrl {
  export type Params = Pick<Url, 'id' | 'userId'>;
  export type Result = void;
}
