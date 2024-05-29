import { Module } from '@nestjs/common';

import { BcryptAdapter } from './bcrypt-adapter';
import { IHashComparer } from '@/data/protocols/cryptography/hash-comparer';
import { IHasher } from '@/data/protocols/cryptography/hasher';

@Module({
  providers: [
    BcryptAdapter,
    {
      provide: 'SALT',
      useValue: 10,
    },
    {
      provide: IHashComparer,
      useClass: BcryptAdapter,
    },
    {
      provide: IHasher,
      useClass: BcryptAdapter,
    },
  ],
  exports: [IHashComparer, IHasher, BcryptAdapter],
})
export class BcryptModule {}
