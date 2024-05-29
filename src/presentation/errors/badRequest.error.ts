import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(name: string) {
    super(name, HttpStatus.BAD_REQUEST);
  }
}
