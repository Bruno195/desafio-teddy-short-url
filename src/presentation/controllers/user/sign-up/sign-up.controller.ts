import { Body, Controller, Post } from '@nestjs/common';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { ICreateUserUsecase } from '@/domain/usecases/user/create-user.usecase';
import { SignUpDto } from '@/presentation/dtos/user/sign-up/in/sign-up.dto';

import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper';
import { ForbiddenError } from '@/presentation/errors/forbidden.error';
import { SkipAuth } from '@/infra/auth/SkipAuth';

@Controller('auth')
export class SignUpController implements IController {
  constructor(private createUserUseCase: ICreateUserUsecase) {}
  @SkipAuth()
  @Post('signup')
  async handle(@Body() body: SignUpDto): Promise<HttpResponse> {
    try {
      const isValid = await this.createUserUseCase.execute(body);

      if (!isValid) {
        return forbidden(new ForbiddenError('Email already in use'));
      }

      return ok(isValid);
    } catch (error) {
      return serverError(error);
    }
  }
}
