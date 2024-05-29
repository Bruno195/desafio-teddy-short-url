import { IFindAllUrlRepository } from '@/data/protocols/db/url/find-all.repository';

import {
  FindAllUrl,
  IFindAllUrlUsecase,
} from '@/domain/usecases/url/find-all-url.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUrlUsecase implements IFindAllUrlUsecase {
  constructor(private findAllUrlRepository: IFindAllUrlRepository) {}
  async execute(params: FindAllUrl.Params): Promise<FindAllUrl.Result> {
    const url = await this.findAllUrlRepository.findAll({
      userId: params.userId,
    });

    return url;
  }
}
