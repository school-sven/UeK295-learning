import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const correlationId = this.getRandomIntInclusive(100000, 999999);
    req['correlationId'] = correlationId;
    Logger.debug(
      `corrId: ${correlationId} -> caller ip: ${req.ip} | baseUrl: ${req.baseUrl} | verb: ${req.method}`,
    );
    next();
  }

  private getRandomIntInclusive(
    min: number = 100000,
    max: number = 999999,
  ): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
