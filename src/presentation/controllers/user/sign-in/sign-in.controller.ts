import { Body, Controller, Post } from '@nestjs/common';
import { IController } from '@/presentation/protocols/controllers';
import { HttpResponse } from '@/presentation/protocols/http';

import { SignInDto } from '@/presentation/dtos/user/sign-in/in/sign-in.dto';
import { ok, serverError } from '@/presentation/helpers/http-helper';
import { AuthService } from '@/infra/auth/auth.service';
import { SkipAuth } from '@/infra/auth/SkipAuth';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class SignInController implements IController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in to the application' })
  @ApiResponse({
    status: 200,
    description: 'Returns the authentication token.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request: Invalid email or password.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: SignInDto })
  async handle(@Body() body: SignInDto): Promise<HttpResponse> {
    try {
      const auth = await this.authService.login(body.email, body.password);
      return ok(auth);
    } catch (error) {
      return serverError(error);
    }
  }
}
