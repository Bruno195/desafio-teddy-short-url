import { IFindByIdUrlRepository } from '@/data/protocols/db/url/find-by-id.repository';

import {
  FindOneUrl,
  IFindOneUrlUsecase,
} from '@/domain/usecases/url/find-one-url.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOneUrlUsecase implements IFindOneUrlUsecase {
  constructor(private findByIdUrlRepository: IFindByIdUrlRepository) {}
  async execute(params: FindOneUrl.Params): Promise<FindOneUrl.Result> {
    const url = await this.findByIdUrlRepository.findbyId({
      userId: params.userId,
      id: params.id,
    });

    return url;
  }
}
