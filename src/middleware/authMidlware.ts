import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      let data = verify(token, 'token');
      req.body.user = data;
      next();
    } catch (error) {
      return res.status(200).json({ status: 1, message: 'token het han' });
    }
  }
}