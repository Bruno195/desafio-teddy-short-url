import { faker } from '@faker-js/faker';

import { FindOneUrlUsecase } from '@/data/usecases/url/find-one.usecase';

import { FindOneUrlRepositorySpy } from 'tests/mocks/mock-find-one.repository';

describe('FindAll One Usecase', () => {
  type SutTypes = {
    sut: FindOneUrlUsecase;
    findOneUrlRepositorySpy: FindOneUrlRepositorySpy;
  };

  const makeSut = (): SutTypes => {
    const findOneUrlRepositorySpy = new FindOneUrlRepositorySpy();
    const sut = new FindOneUrlUsecase(findOneUrlRepositorySpy);

    return {
      sut,
      findOneUrlRepositorySpy,
    };
  };
  it('Should return all users urls ', async () => {
    const { sut, findOneUrlRepositorySpy } = makeSut();
    const userId = faker.string.uuid();
    const id = faker.string.uuid();

    const urls = await sut.execute({ userId, id });

    expect(urls).toEqual(findOneUrlRepositorySpy.result);
  });

  it('Should call findAllUrls with correct values ', async () => {
    const { sut, findOneUrlRepositorySpy } = makeSut();
    const userId = faker.string.uuid();
    const id = faker.string.uuid();

    await sut.execute({ userId, id });

    expect(userId).toBe(findOneUrlRepositorySpy.userId);
  });
});
