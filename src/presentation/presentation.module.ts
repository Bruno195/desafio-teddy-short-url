import { PrismaModule } from '@/infra/db/prisma.module';
import { Module } from '@nestjs/common';
import { SignUpController } from './controllers/user/sign-up/sign-up.controller';

import { BcryptModule } from '@/infra/cryptography/cryptography.module';
import { CreateUserUseCase } from '@/data/usecases/user/create-user.usecase';
import { ICreateUserUsecase } from '@/domain/usecases/user/create-user.usecase';

import { CreateShortUrlUsecase } from '@/data/usecases/url/create-short-url.usecase';
import { ICreateShortUrlUsecase } from '@/domain/usecases/url/create-short-url.usecase';
import { ShortUrlController } from './controllers/url/short-url/short-url.controller';
import { RedirectUrlController } from './controllers/url/redirect-url.ts/redirect.controller';
import { IRedirectUrlUsecase } from '@/domain/usecases/url/redirect-url.usecase';
import { RedirectUrlUsecase } from '@/data/usecases/url/redirect-url.usecase';

import { UpdateUrlController } from './controllers/url/update/update-url.controller';
import { IUpdateUrlUsecase } from '@/domain/usecases/url/update-url.usecase';
import { UpdateUrlUsecase } from '@/data/usecases/url/update.usecase';
import { IFindOneUrlUsecase } from '@/domain/usecases/url/find-one-url.usecase';
import { FindOneUrlUsecase } from '@/data/usecases/url/find-one.usecase';
import { IFindAllUrlUsecase } from '@/domain/usecases/url/find-all-url.usecase';
import { FindAllUrlUsecase } from '@/data/usecases/url/find-all.usecase';
import { DeleteUrlUsecase } from '@/data/usecases/url/delete.usecase';
import { IDeleteUrlUsecase } from '@/domain/usecases/url/delete-url.usecase';
import { SignInController } from './controllers/user/sign-in/sign-in.controller';
import { FindAlltUrlController } from './controllers/url/find-all/find-all.controller';
import { AuthModule } from '@/infra/auth/auth.module';
import { FindOneUrlController } from './controllers/url/find-one/find-one.controller';
import { DeleteUrlController } from './controllers/url/delete/delete.controller';
@Module({
  imports: [PrismaModule, BcryptModule, AuthModule],
  controllers: [
    SignUpController,
    ShortUrlController,
    RedirectUrlController,
    SignInController,
    UpdateUrlController,
    FindAlltUrlController,
    FindOneUrlController,
    DeleteUrlController,
  ],
  providers: [
    {
      provide: IDeleteUrlUsecase,
      useClass: DeleteUrlUsecase,
    },
    {
      provide: IFindAllUrlUsecase,
      useClass: FindAllUrlUsecase,
    },
    {
      provide: IFindOneUrlUsecase,
      useClass: FindOneUrlUsecase,
    },
    {
      provide: IUpdateUrlUsecase,
      useClass: UpdateUrlUsecase,
    },
    {
      provide: ICreateUserUsecase,
      useClass: CreateUserUseCase,
    },
    {
      provide: ICreateShortUrlUsecase,
      useClass: CreateShortUrlUsecase,
    },
    {
      provide: IRedirectUrlUsecase,
      useClass: RedirectUrlUsecase,
    },
  ],
})
export class PresentationModule {}
