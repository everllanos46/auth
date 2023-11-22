import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  private keycloakBaseUrl = 'http://localhost:8080';
  private clientId = 'admin-cli';
  private realm = 'master';

  async getAccessToken(username: string, password: string): Promise<string> {
    const tokenEndpoint = `${this.keycloakBaseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams({
      username: username,
      password: password,
      grant_type: 'password',
      client_id: this.clientId,
    });

    try {
      const response = await axios.post(tokenEndpoint, data, { headers });
      return response.data;
    } catch (error) {
      // Manejar errores, loggear, etc.
      throw error;
    }
  }
}
