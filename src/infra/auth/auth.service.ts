import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { PrismaService } from '@/infra/db/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private bcryptAdapter: BcryptAdapter,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; name: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (
      !user &&
      !(await this.bcryptAdapter.toCompare(password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.sign(payload),
      name: user.name,
    };
  }
}
