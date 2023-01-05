import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import keys from '../config/keys';
@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new HttpException(
          'no token or invalidtoken',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = authHeader.split(' ')[1];
      const payLoad = jwt.verify(token, keys.JWT_SECRETE);

      const { id, role } = payLoad;
      if (role !== 'admin') {
        throw new HttpException(
          'this account does not have admin privileges',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const user: any = { id, role };
      req['user'] = user;

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
