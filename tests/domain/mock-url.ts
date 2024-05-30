import { DeleteUrl } from '@/domain/usecases/url/delete-url.usecase';
import { faker } from '@faker-js/faker';

export const mockDeleteUrlParams = (): DeleteUrl.Params => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
});

export const mockFindAllResultModel = () => {
  return [
    {
      id: faker.string.uuid(),
      originalUrl: faker.internet.url(),
      shortUrl: faker.internet.url(),
      totalAccess: faker.number.int(),
      createdAt: faker.date.recent(),
      updateAt: faker.date.recent(),
    },
  ];
};

export const mockFindOneResultModel = () => {
  return {
    id: faker.string.uuid(),
    originalUrl: faker.internet.url(),
    shortUrl: faker.internet.url(),
    totalAccess: faker.number.int(),
    createdAt: faker.date.recent(),
    updateAt: faker.date.recent(),
  };
};
