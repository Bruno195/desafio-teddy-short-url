import { IHashComparer } from '@/data/protocols/cryptography/hash-comparer';
import { IHasher } from '@/data/protocols/cryptography/hasher';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter implements IHasher, IHashComparer {
  constructor(@Inject('SALT') private readonly salt: number) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async toCompare(password: string, digest: string): Promise<boolean> {
    return bcrypt.compare(password, digest);
  }
}
