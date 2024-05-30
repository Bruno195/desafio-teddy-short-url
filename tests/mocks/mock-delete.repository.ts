import {
  DeleteUrlRepository,
  IDeleteUrlRepository,
} from '@/data/protocols/db/url/delete.repository';

export class DeleteUrlRepositorySpy implements IDeleteUrlRepository {
  public data: DeleteUrlRepository.Params;

  async delete(data: DeleteUrlRepository.Params): Promise<void> {
    this.data = data;
  }
}
