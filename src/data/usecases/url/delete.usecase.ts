import { IDeleteUrlRepository } from '@/data/protocols/db/url/delete.repository';

import {
  DeleteUrl,
  IDeleteUrlUsecase,
} from '@/domain/usecases/url/delete-url.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUrlUsecase implements IDeleteUrlUsecase {
  constructor(private deleteUrlRepository: IDeleteUrlRepository) {}
  async execute(params: DeleteUrl.Params): Promise<DeleteUrl.Result> {
    await this.deleteUrlRepository.delete({
      id: params.id,
      userId: params.userId,
    });
  }
}
