import { FindAllUrlUsecase } from '@/data/usecases/url/find-all.usecase';

import { faker } from '@faker-js/faker';
import { FindAllUrlRepositorySpy } from '../../../tests/mocks/mock-findall.repository';

describe('FindAll Urls Usecase', () => {
  type SutTypes = {
    sut: FindAllUrlUsecase;
    findAllUrlRepositorySpy: FindAllUrlRepositorySpy;
  };

  const makeSut = (): SutTypes => {
    const findAllUrlRepositorySpy = new FindAllUrlRepositorySpy();
    const sut = new FindAllUrlUsecase(findAllUrlRepositorySpy);

    return {
      sut,
      findAllUrlRepositorySpy,
    };
  };
  it('Should return all users urls ', async () => {
    const { sut, findAllUrlRepositorySpy } = makeSut();
    const userId = faker.string.uuid();

    const urls = await sut.execute({ userId });

    expect(urls).toEqual(findAllUrlRepositorySpy.result);
  });

  it('Should call findAllUrls with correct values ', async () => {
    const { sut, findAllUrlRepositorySpy } = makeSut();
    const userId = faker.string.uuid();

    await sut.execute({ userId });

    expect(userId).toBe(findAllUrlRepositorySpy.userId);
  });
});
