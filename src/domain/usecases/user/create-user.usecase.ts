import { User } from '@/domain/models/user.model';
import { UseCase } from '../protocol.usecase';

export abstract class ICreateUserUsecase extends UseCase<
  CreateUserUsecase.Params,
  CreateUserUsecase.Result
> {}

export namespace CreateUserUsecase {
  export type Params = Pick<User, 'name' | 'email' | 'password'>;
  export type Result = boolean;
}
