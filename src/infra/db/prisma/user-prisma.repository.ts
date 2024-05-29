import { PrismaService } from '@/infra/db/prisma.service';
import { ICheckUserByEmailRepository } from '@/data/protocols/db/user/check-user-by-email.repository';
import { Injectable } from '@nestjs/common';
import {
  CreateUserRespository,
  IUserCreateRepository,
} from 'src/data/protocols/db/user/create-user.repository';
import {
  IFindUserByIdRepository,
  FindUserByIdRepository,
} from '@/data/protocols/db/user/find-user-by-id.repository';

@Injectable()
export class UserPrismaRepository
  implements
    IUserCreateRepository,
    ICheckUserByEmailRepository,
    IFindUserByIdRepository
{
  constructor(private prisma: PrismaService) {}
  async findUserById(
    data: FindUserByIdRepository.Params,
  ): Promise<FindUserByIdRepository.Result> {
    const findUserById = await this.prisma.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
      },
    });

    if (!findUserById) {
      return null;
    }

    return { id: findUserById.id };
  }
  async checkByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user !== null;
  }

  async create(
    data: CreateUserRespository.Params,
  ): Promise<CreateUserRespository.Result> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
      },
    });

    return user !== null;
  }
}
