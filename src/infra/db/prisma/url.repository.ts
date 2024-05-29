import {
  CreateShortUrlRepository,
  ICreateShortUrlRepository,
} from '@/data/protocols/db/url/create-short-url.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  FindOriginalUrlRepositoy,
  IFindOriginalUrlRepositoy,
} from '@/data/protocols/db/url/find-original-url.repositry';
import {
  FindShortUrlRepositoy,
  IFindShortUrlRepository,
} from '@/data/protocols/db/url/find-short-url.repository';
import {
  CountAccessRepository,
  ICountAccessRepository,
} from '@/data/protocols/db/url/count-access.repository';
import {
  IUpdateUrlRepository,
  UpdateUrlRepository,
} from '@/data/protocols/db/url/update.repository';
import {
  FindByIdUrlRepository,
  IFindByIdUrlRepository,
} from '@/data/protocols/db/url/find-by-id.repository';
import {
  FindAllUrlRepository,
  IFindAllUrlRepository,
} from '@/data/protocols/db/url/find-all.repository';
import {
  DeleteUrlRepository,
  IDeleteUrlRepository,
} from '@/data/protocols/db/url/delete.repository';

@Injectable()
export class UrlRepository
  implements
    ICreateShortUrlRepository,
    IFindOriginalUrlRepositoy,
    IFindShortUrlRepository,
    ICountAccessRepository,
    IUpdateUrlRepository,
    IFindByIdUrlRepository,
    IFindAllUrlRepository,
    IDeleteUrlRepository
{
  constructor(private prisma: PrismaService) {}
  async delete(
    data: DeleteUrlRepository.Params,
  ): Promise<DeleteUrlRepository.Result> {
    await this.prisma.url.update({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
  async findAll(
    data: FindAllUrlRepository.Params,
  ): Promise<FindAllUrlRepository.Result> {
    const findAll = await this.prisma.url.findMany({
      where: {
        user_id: data.userId,
        deleted_at: null,
      },
    });

    return findAll.map((item) => ({
      id: item.id,
      originalUrl: item.original_url,
      shortUrl: item.short_url,
      totalAccess: item.total_access,
      updateAt: item.updated_at,
      createdAt: item.created_at,
    }));
  }

  async findbyId(
    data: FindByIdUrlRepository.Params,
  ): Promise<FindByIdUrlRepository.Result> {
    const findById = await this.prisma.url.findUnique({
      where: {
        id: data.id,
        user_id: data.userId,
        deleted_at: null,
      },
    });

    if (!findById) {
      return null;
    }

    return {
      id: findById.id,
      originalUrl: findById.original_url,
      shortUrl: findById.short_url,
      totalAccess: findById.total_access,
      updateAt: findById.updated_at,
      createdAt: findById.created_at,
    };
  }
  async update(
    data: UpdateUrlRepository.Params,
  ): Promise<UpdateUrlRepository.Result> {
    const update = await this.prisma.url.update({
      where: {
        id: data.id,
        user_id: data.userId,
        deleted_at: null,
      },
      data: {
        original_url: data.originalUrl,
      },
    });

    if (!update) {
      return null;
    }

    return {
      id: update.id,
      originalUrl: update.original_url,
      shortUrl: update.short_url,
      totalAccess: update.total_access,
      updateAt: update.updated_at,
      createdAt: update.created_at,
    };
  }

  async countAccess(
    data: CountAccessRepository.Params,
  ): Promise<CountAccessRepository.Result> {
    await this.prisma.url.update({
      where: {
        id: data.id,
      },
      data: {
        total_access: { increment: 1 },
      },
    });
  }

  async findShortUrl(
    data: FindShortUrlRepositoy.Params,
  ): Promise<FindShortUrlRepositoy.Result> {
    const findShortUrl = await this.prisma.url.findFirst({
      where: {
        short_url: data.shortUrl,
      },
    });

    return findShortUrl
      ? {
          id: findShortUrl.id,
          originalUrl: findShortUrl.original_url,
        }
      : null;
  }

  async findOriginalUrl(
    data: FindOriginalUrlRepositoy.Params,
  ): Promise<FindOriginalUrlRepositoy.Result> {
    const findOriginalUrl = await this.prisma.url.findFirst({
      where: {
        original_url: data.originalUrl,
        deleted_at: null,
        user_id: data.userId ? data.userId : undefined,
      },
    });

    if (!findOriginalUrl) {
      return null;
    }

    return {
      id: findOriginalUrl.id,
      shortUrl: findOriginalUrl.short_url,
    };
  }
  async create(
    data: CreateShortUrlRepository.Params,
  ): Promise<CreateShortUrlRepository.Result> {
    const { originalUrl, shortUrl, userId } = data;

    const url = await this.prisma.url.create({
      data: {
        original_url: originalUrl,
        short_url: shortUrl,
        user_id: userId,
        total_access: 0,
      },
    });

    return {
      id: url.id,
      originalUrl: url.original_url,
      shortUrl: url.short_url,
      totalAccess: url.total_access,
      userId: url.user_id,
    };
  }
}
