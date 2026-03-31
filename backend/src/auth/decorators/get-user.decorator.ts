import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
