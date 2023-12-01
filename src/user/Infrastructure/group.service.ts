import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  private keycloakBaseUrl = 'http://localhost:8080';
  private clientId = 'admin-cli';
  private realm = 'master';

  async createGroup(adminToken: string): Promise<void> {
    const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/groups`;
    const data = {
      name: 'group-test',
    };

    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getGroups(adminToken: string) {
    try {
      const response = await axios.get(`${this.keycloakBaseUrl}/admin/realms/dev-test/groups`, {
        headers: {
          Authorization: `Bearer ${adminToken}`, 
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error making GET request:', error);
      throw error;
    }
  }
}
