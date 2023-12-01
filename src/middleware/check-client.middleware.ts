import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckClientMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    const client_id = this.extractClientIdFromToken(token);
    if (this.checkAccessToRoute(client_id)) {
      next();
    } else {
      res.status(403).send('Acceso no autorizado para este cliente');
    }
  }

  private extractClientIdFromToken(token: string): string | null {
    try {
      const decodedToken = jwt.decode(token.replace('Bearer ', '')) as {
        azp: string;
      };
      return decodedToken.azp;
    } catch (error) {
      return null;
    }
  }

  private checkAccessToRoute(clientId: string | null): boolean {
    return clientId === 'admin-cli';
  }
}
