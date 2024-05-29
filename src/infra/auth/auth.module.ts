import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { PrismaService } from '@/infra/db/prisma.service';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    BcryptAdapter,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: 'SALT',
      useValue: 10,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
