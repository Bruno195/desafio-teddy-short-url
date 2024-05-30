import {
  FindByIdUrlRepository,
  IFindByIdUrlRepository,
} from '@/data/protocols/db/url/find-by-id.repository';

import { mockFindOneResultModel } from 'tests/domain/mock-url';

export class FindOneUrlRepositorySpy implements IFindByIdUrlRepository {
  userId: string;
  id: string;

  result = mockFindOneResultModel();
  async findbyId(
    data: FindByIdUrlRepository.Params,
  ): Promise<FindByIdUrlRepository.Result> {
    this.userId = data.userId;
    this.id = data.id;

    return this.result;
  }
}
