import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserCreateRepository } from '@/data/protocols/db/user/create-user.repository';
import { UserPrismaRepository } from '@/infra/db/prisma/user-prisma.repository';
import { ICheckUserByEmailRepository } from '@/data/protocols/db/user/check-user-by-email.repository';
import { ICreateShortUrlRepository } from '@/data/protocols/db/url/create-short-url.repository';
import { UrlRepository } from './prisma/url.repository';
import { IFindOriginalUrlRepositoy } from '@/data/protocols/db/url/find-original-url.repositry';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/find-user-by-id.repository';
import { IFindShortUrlRepository } from '@/data/protocols/db/url/find-short-url.repository';
import { ICountAccessRepository } from '@/data/protocols/db/url/count-access.repository';
import { IDeleteUrlRepository } from '@/data/protocols/db/url/delete.repository';
import { IFindAllUrlRepository } from '@/data/protocols/db/url/find-all.repository';
import { IFindByIdUrlRepository } from '@/data/protocols/db/url/find-by-id.repository';
import { IUpdateUrlRepository } from '@/data/protocols/db/url/update.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserCreateRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ICheckUserByEmailRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IFindUserByIdRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ICreateShortUrlRepository,
      useClass: UrlRepository,
    },
    {
      provide: IFindOriginalUrlRepositoy,
      useClass: UrlRepository,
    },
    {
      provide: IFindShortUrlRepository,
      useClass: UrlRepository,
    },
    {
      provide: ICountAccessRepository,
      useClass: UrlRepository,
    },
    {
      provide: IUpdateUrlRepository,
      useClass: UrlRepository,
    },
    {
      provide: IFindByIdUrlRepository,
      useClass: UrlRepository,
    },
    {
      provide: IFindAllUrlRepository,
      useClass: UrlRepository,
    },
    {
      provide: IDeleteUrlRepository,
      useClass: UrlRepository,
    },
  ],
  exports: [
    IUserCreateRepository,
    ICheckUserByEmailRepository,
    PrismaService,
    ICreateShortUrlRepository,
    IFindOriginalUrlRepositoy,
    IFindUserByIdRepository,
    IFindShortUrlRepository,
    ICountAccessRepository,
    IUpdateUrlRepository,
    IFindByIdUrlRepository,
    IFindAllUrlRepository,
    IDeleteUrlRepository,
  ],
})
export class PrismaModule {}
