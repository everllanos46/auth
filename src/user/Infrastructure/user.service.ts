import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { login } from 'src/share/resources/apiUtils';
import { UserCreate, UserEdit, UserReset } from '../domain/user.dto';

@Injectable()
export class UserService {

  get url(): string {
    return this._url;
  }
  set url(value: string) {
    this._url = value;
  }

  private _url = `${this.configService.get(
    'AUTH_SERVER_URL',
  )}/admin/realms/${this.configService.get('REALM')}`;
  constructor(private readonly configService: ConfigService) { }


  private async login_admin(): Promise<any> {
    return await login(
      this.configService.get('ADMIN_USER'),
      this.configService.get('ADMIN_PASSWORD'),
      this.configService.get('AUTH_SERVER_URL'),
    );
  }

  private async getHeadersAdmin() {
    const { access_token } = await this.login_admin();

    return {
      authorization: `bearer ${access_token}`,
    };
  }

  async getUsers(): Promise<any> {
    const headers = await this.getHeadersAdmin();
    const url = `${this._url}/users`;
    return await axios.get(url, {
      headers
    });
  }

  async resetPassword(userReset: UserReset): Promise<void> {
    const url = `${this._url}/users/${userReset.userId}/reset-password`;
    const headers = await this.getHeadersAdmin();
    return await axios.put(url, userReset, {
      headers
    });
  }

  async createUser(userCreate: UserCreate) {
    const headers = await this.getHeadersAdmin();
    const url = `${this.url}/users`;

    return await axios.post(url, userCreate, {
      headers
    });
  }

  async editUser(userEdit: UserEdit) {
    const headers = await this.getHeadersAdmin();
    const url = `${this._url}/users/${userEdit.userId}`;
    return await axios.put(url, userEdit, {
      headers
    });
  }
}
