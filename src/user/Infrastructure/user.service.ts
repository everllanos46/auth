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
      throw error;
    }
  }

  async getUsers(adminToken: string): Promise<any> {
    const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/users`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(userId: string, adminToken: string, pass: string): Promise<void> {
    const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/users/${userId}/reset-password`;
    const data = {
      type: 'password',
      value: pass,
      temporary: false,
    };

    try {
      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
