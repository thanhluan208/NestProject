import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    console.log('Authorization', req.headers);
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No authentication token provided' });
    }
    next();
  }
}
