import { HttpResponse } from '@/presentation/protocols/http';
import { HttpException, HttpStatus } from '@nestjs/common';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const redirect = (data: any): HttpResponse => ({
  statusCode: 302,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
