import {
  FindAllUrlRepository,
  IFindAllUrlRepository,
} from '@/data/protocols/db/url/find-all.repository';

import { mockFindAllResultModel } from 'tests/domain/mock-url';

export class FindAllUrlRepositorySpy implements IFindAllUrlRepository {
  userId: string;
  result = mockFindAllResultModel();

  async findAll(
    data: FindAllUrlRepository.Params,
  ): Promise<FindAllUrlRepository.Result> {
    this.userId = data.userId;

    return this.result;
  }
}
