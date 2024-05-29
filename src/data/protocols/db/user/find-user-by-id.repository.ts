import { User } from '@/domain/models/user.model';

export abstract class IFindUserByIdRepository {
  abstract findUserById(
    data: FindUserByIdRepository.Params,
  ): Promise<FindUserByIdRepository.Result>;
}

export namespace FindUserByIdRepository {
  export type Params = Pick<User, 'id'>;
  export type Result = Pick<User, 'id'>;
}
