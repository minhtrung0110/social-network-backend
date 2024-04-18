import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiResponse } from '../../common/model';

// This a custom decorator to return 1 user data
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return ApiResponse.success(request.user, 'Get data successfully');
});
