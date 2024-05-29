import { CreateUserUsecase } from '@/domain/usecases/user/create-user.usecase';

export abstract class IUserCreateRepository {
  abstract create(
    data: CreateUserRespository.Params,
  ): Promise<CreateUserRespository.Result>;
}

export namespace CreateUserRespository {
  export type Params = CreateUserUsecase.Params;
  export type Result = CreateUserUsecase.Result;
}
