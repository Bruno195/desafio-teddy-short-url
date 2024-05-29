import { Url } from '@/domain/models/url.model';
import { UseCase } from '../protocol.usecase';

export abstract class IFindAllUrlUsecase extends UseCase<
  FindAllUrl.Params,
  FindAllUrl.Result
> {}

export namespace FindAllUrl {
  export type Params = Pick<Url, 'userId'>;
  export type Result = Omit<Url, 'id' | 'userId'>[];
}
