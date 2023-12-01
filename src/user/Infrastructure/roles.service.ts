import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  private keycloakBaseUrl = 'http://localhost:8080';
  private clientId = 'admin-cli';
  private realm = 'master';

  async getRoles(adminToken: string, realmName: string): Promise<any> {
    const url = `${this.keycloakBaseUrl}/admin/realms/${realmName}/roles`;

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
  async createRole(adminToken: string, nameRole: string, realmName: string, roleDescription: string): Promise<void> {
    const url = `${this.keycloakBaseUrl}/admin/realms/${realmName}/roles`;
    const data = {
      name: nameRole,
      description: roleDescription
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

  async assignRoleToUser(userId: string, adminToken: string, realmName: string, roleId: string, roleName: string) {
    try {
      const url = `${this.keycloakBaseUrl}/admin/realms/${realmName}/users/${userId}/role-mappings/realm`;

      const response = await axios.post(url, [
        {
          "id": roleId,
          "name": roleName
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

  async addRoleToGroup(groupId: string, adminToken: string, realmName: string, roleId: string, roleName: string) {
    try {
      const url = `${this.keycloakBaseUrl}/admin/realms/${realmName}/groups/${groupId}/role-mappings/realm`;

      const response = await axios.post(url, [
        {
          "id": roleId,
          "name": roleName
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
