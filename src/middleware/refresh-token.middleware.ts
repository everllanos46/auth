import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

export const refreshToken = async (
  refresh_token: string,
  keycloakBaseUrl: string,
  realm: string,
  client_id: string
) => {
  const tokenEndpoint = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: client_id,
    refresh_token: refresh_token,
  });

  try {
    const response = await axios.post(tokenEndpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly keycloakBaseUrl: string,
    private readonly realm: string,
    private readonly clientId: string
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    const client_id = this.extractClientIdFromToken(token);
    if (this.checkAccessToRoute(client_id)) {
      next();
    } else {
      res.status(403).send('Unauthorized access for this client');
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
    return clientId === this.clientId;
  }
}
