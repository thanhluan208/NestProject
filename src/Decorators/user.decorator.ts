import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Query = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query;
  },
);
