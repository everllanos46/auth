import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('configuration', () => ({
  CLIENT_ID: process.env.CLIENT_ID,
  AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
  REALM: process.env.REALM,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
}));
