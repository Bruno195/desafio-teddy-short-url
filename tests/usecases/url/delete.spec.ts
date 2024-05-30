import { DeleteUrlUsecase } from '@/data/usecases/url/delete.usecase';
import { IDeleteUrlUsecase } from '@/domain/usecases/url/delete-url.usecase';
import { mockDeleteUrlParams } from '../../domain/mock-url';
import { DeleteUrlRepositorySpy } from '../../../tests/mocks/mock-delete.repository';

type SutTypes = {
  sut: IDeleteUrlUsecase;
  deleteUrlRepositorySpy: DeleteUrlRepositorySpy;
};

const makeSut = (): SutTypes => {
  const deleteUrlRepositorySpy = new DeleteUrlRepositorySpy();
  const sut = new DeleteUrlUsecase(deleteUrlRepositorySpy);

  return {
    sut,
    deleteUrlRepositorySpy,
  };
};

describe('Delete Usecase', () => {
  it('Should call DeleteUrlUsecase with correct values', async () => {
    const { sut, deleteUrlRepositorySpy } = makeSut();

    const deleteUrlParams = mockDeleteUrlParams();

    await sut.execute(deleteUrlParams);

    expect(deleteUrlRepositorySpy.data).toEqual({
      userId: deleteUrlParams.userId,
      id: deleteUrlParams.id,
    });
  });

  it('Should return true on succes', async () => {
    const { sut } = makeSut();
    const isValid = await sut.execute(mockDeleteUrlParams());

    expect(isValid).toEqual(undefined);
  });
});
