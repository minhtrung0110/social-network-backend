import { prismaErrors } from './prisma.error';

export class ApiResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.status = statusCode;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>(200, message, data);
  }

  static error<T>(statusCode: number, message: string): ApiResponse<T> {
    const errorMessage = prismaErrors[statusCode];
    return new ApiResponse<T>(statusCode, errorMessage || message, null);
  }
}
