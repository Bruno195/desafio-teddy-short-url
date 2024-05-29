import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class IUpdateUrlUsecase extends UseCase<
  UpdateUrl.Params,
  UpdateUrl.Result
> {}

export namespace UpdateUrl {
  export type Params = Pick<Url, 'id' | 'userId' | 'originalUrl'>;
  export type Result = Omit<Url, 'id' | 'userId'>;
}
