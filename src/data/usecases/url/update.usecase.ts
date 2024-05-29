import { IUpdateUrlRepository } from '@/data/protocols/db/url/update.repository';

import {
  IUpdateUrlUsecase,
  UpdateUrl,
} from '@/domain/usecases/url/update-url.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUrlUsecase implements IUpdateUrlUsecase {
  constructor(private updateUrlRepository: IUpdateUrlRepository) {}
  async execute(params: UpdateUrl.Params): Promise<UpdateUrl.Result> {
    const url = await this.updateUrlRepository.update({
      id: params.id,
      userId: params.userId,
      originalUrl: params.originalUrl,
    });

    return url;
  }
}
