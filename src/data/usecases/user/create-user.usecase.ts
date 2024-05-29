import {
  CreateUserUsecase,
  ICreateUserUsecase,
} from 'src/domain/usecases/user/create-user.usecase';
import { IUserCreateRepository } from '../../protocols/db/user/create-user.repository';
import { Injectable } from '@nestjs/common';
import { ICheckUserByEmailRepository } from '../../protocols/db/user/check-user-by-email.repository';
import { IHasher } from '../../protocols/cryptography/hasher';

@Injectable()
export class CreateUserUseCase implements ICreateUserUsecase {
  constructor(
    private userRepository: IUserCreateRepository,
    private checkUserByEmail: ICheckUserByEmailRepository,
    private hasher: IHasher,
  ) {}

  async execute(
    data: CreateUserUsecase.Params,
  ): Promise<CreateUserUsecase.Result> {
    const exists = await this.checkUserByEmail.checkByEmail(data.email);

    let isValid = false;
    if (!exists) {
      const hashCode = await this.hasher.hashPassword(data.password);

      isValid = await this.userRepository.create({
        email: data.email,
        name: data.name,
        password: hashCode,
      });
    }

    return isValid;
  }
}
