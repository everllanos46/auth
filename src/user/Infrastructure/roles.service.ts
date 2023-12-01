import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  private keycloakBaseUrl = 'http://localhost:8080';
  private clientId = 'admin-cli';
  private realm = 'master';

  async getRoles(adminToken: string): Promise<any> {
    const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/roles`;

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
  async createRole(adminToken: string, nameRole: string): Promise<void> {
    const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/roles`;
    const data = {
      name: nameRole,
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

  async assignRoleToUser(userId: string, adminToken: string) {
    try {
      const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/users/${userId}/role-mappings/realm`;
      
      const response = await axios.post(url, [
        {
          "id": "d3c5f0b4-e2b5-4f2e-a183-2806ec685426",
          "name": "testi"
        }
      ], {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error making POST request:', error);
      throw error;
    }
  }

  async addRoleToGroup(groupId: string, adminToken: string) {
    try {
      const url = `${this.keycloakBaseUrl}/admin/realms/dev-test/groups/${groupId}/role-mappings/realm`;

      const response = await axios.post(url, [
        {
          "id": "d3c5f0b4-e2b5-4f2e-a183-2806ec685426",
          "name": "testi"
        }
      ], {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error making POST request:', error);
      throw error;
    }
  }
}
