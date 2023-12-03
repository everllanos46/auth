import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { login } from '../../share/resources/apiUtils';
import axios from 'axios';
import { RolCreate } from '../domain/rol.dto';

@Injectable()
export class RolService {
  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
  private _url = `${this.configService.get(
    'AUTH_SERVER_URL',
  )}/admin/realms/${this.configService.get('REALM')}`;
  constructor(private readonly configService: ConfigService) {}

  private async login_admin(): Promise<any> {
    return await login(
      this.configService.get('ADMIN_USER'),
      this.configService.get('ADMIN_PASSWORD'),
      this.configService.get('AUTH_SERVER_URL'),
    );
  }
  async getRoles(): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.get(`${this._url}/roles`, { headers });
  }

  private async getHeadersAdmin() {
    const { access_token } = await this.login_admin();

    return {
      authorization: `bearer ${access_token}`,
    };
  }

  async createRoles(rol: RolCreate): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(`${this._url}/roles`, rol, { headers });
  }

  async editRol(rol: RolCreate, old_name: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.put(`${this._url}/roles/${old_name}`, rol, { headers });
  }

  async deleteRol(rolName: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.delete(`${this._url}/roles/${rolName}`, { headers });
  }

  async createRolToClient(rol: RolCreate, client_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(`${this._url}/clients/${client_id}/roles`, rol, {
      headers,
    });
  }

  async getRolesClient(client_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.get(`${this._url}/clients/${client_id}/roles`, {
      headers,
    });
  }

  async editRolClient(
    rol: RolCreate,
    client_id: string,
    role_name: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.put(
      `${this._url}/clients/${client_id}/roles/${role_name}`,
      rol,
      {
        headers,
      },
    );
  }

  async deleteRolClient(client_id: string, role_name: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.delete(
      `${this._url}/clients/${client_id}/roles/${role_name}`,
      { headers },
    );
  }

  async addUserRealmRoles(roles: any, user_id: string): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(
      `${this._url}/users/${user_id}/role-mappings/realm`,
      roles,
      { headers },
    );
  }

  async addUserClientRoles(
    roles: any,
    user_id: string,
    client_id: string,
  ): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(
      `${this._url}/users/${user_id}/role-mappings/clients/${client_id}`,
      roles,
      { headers },
    );
  }
}
