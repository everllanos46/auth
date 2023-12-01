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
  )}/realms/${this.configService.get('REALM')}/roles`;
  constructor(private readonly configService: ConfigService) {}

  private async login_admin(): Promise<any> {
    return await login(
      this.configService.get('ADMIN_USER'),
      this.configService.get('ADMIN_PASSWORD'),
      this.configService.get('AUTH_SERVER_URL'),
    );
  }
  async getRoles(): Promise<string> {
    const headers = await this.getHeadersAdmin();
    return await axios.get(this._url, { headers });
  }

  private async getHeadersAdmin() {
    const { access_token } = await this.login_admin();

    return {
      authorization: `bearer ${access_token}`,
    };
  }

  async createRoles(rol: RolCreate): Promise<any> {
    const headers = await this.getHeadersAdmin();
    return await axios.post(this._url, rol, { headers });
  }
}
