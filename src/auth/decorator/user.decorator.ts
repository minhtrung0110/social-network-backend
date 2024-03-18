import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// This a custom decorator to return 1 user data
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
