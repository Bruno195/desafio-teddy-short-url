export abstract class ICheckUserByEmailRepository {
  abstract checkByEmail(
    email: string,
  ): Promise<CheckUserByEmailRepository.Result>;
}

namespace CheckUserByEmailRepository {
  export type Result = boolean;
}
