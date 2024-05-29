import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenError extends HttpException {
  constructor(name: string) {
    super(name, HttpStatus.FORBIDDEN);
  }
}
