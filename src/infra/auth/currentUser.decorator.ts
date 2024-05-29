import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type CurrentSessionUser = {
  userId: string;
  email: string;
};

export const CurrentSessionUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user as CurrentSessionUser;
  },
);
