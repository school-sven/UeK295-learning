import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req['correlationId'];
  },
);
