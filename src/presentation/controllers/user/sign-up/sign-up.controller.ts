import { Body, Controller, Post } from '@nestjs/common';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';
import { ICreateUserUsecase } from '@/domain/usecases/user/create-user.usecase';
import { SignUpDto } from '@/presentation/dtos/user/sign-up/in/sign-up.dto';

import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper';
import { ForbiddenError } from '@/presentation/errors/forbidden.error';
import { SkipAuth } from '@/infra/auth/SkipAuth';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class SignUpController implements IController {
  constructor(private createUserUseCase: ICreateUserUsecase) {}
  @SkipAuth()
  @Post('signup')
  @ApiOperation({ summary: 'Sign Up to the application' })
  @ApiResponse({
    status: 200,
    description: 'Return true.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Email already in use.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: SignUpDto })
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
