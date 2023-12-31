import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { login } from '../../share/resources/apiUtils';
import axios from 'axios';
import { PolicyEdit, Policy, Permission } from '../domain/permission.dto';

@Injectable()
export class PermissionService {
  private _url = `${this.configService.get(
    'AUTH_SERVER_URL',
  )}/admin/realms/${this.configService.get('REALM')}`;
  constructor(private readonly configService: ConfigService) {}

  private async login_admin(): Promise<any> {
    return await login(
      this.configService.get('ADMIN_USER'),
      this.configService.get('ADMIN_PASSWORD'),
      this.configService.get('AUTH_SERVER_URL'),
      this.configService.get('REALM'),
      this.configService.get('CLIENT_ID'),
      ""
    );
  }
  private async getHeadersAdmin() {
    const { access_token } = await this.login_admin();

    return {
      authorization: `bearer ${access_token}`,
    };
  }

  async getPolices(client_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.get(
      `${this._url}/clients/${client_id}/authz/resource-server/policy`,
      { headers },
    );
  }

  async deletePolicy(client_id: string, policy_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.delete(
      `${this._url}/clients/${client_id}/authz/resource-server/policy/${policy_id}`,
      { headers },
    );
  }

  async createPolicy(policy: Policy, client_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(
      `${this._url}/clients/${client_id}/authz/resource-server/policy/role`,
      policy,
      { headers },
    );
  }

  async updatePolicy(
    policy: PolicyEdit,
    client_id: string,
    policy_id: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.put(
      `${this._url}/clients/${client_id}/authz/resource-server/policy/role/${policy_id}`,
      policy,
      { headers },
    );
  }

  async createPermission(
    permission: Permission,
    client_id: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(
      `${this._url}/clients/${client_id}/authz/resource-server/permission/resource`,
      permission,
      { headers },
    );
  }

  async editPermission(
    permission: Permission,
    client_id: string,
    permission_id: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.put(
      `${this._url}/clients/${client_id}/authz/resource-server/permission/resource/${permission_id}`,
      permission,
      { headers },
    );
  }

  async getPermissions(client_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.get(
      `${this._url}/clients/${client_id}/authz/resource-server/permission`,
      { headers },
    );
  }

  async deletePermission(
    client_id: string,
    permission_id: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.delete(
      `${this._url}/clients/${client_id}/authz/resource-server/permission/resource/${permission_id}`,
      { headers },
    );
  }
}
