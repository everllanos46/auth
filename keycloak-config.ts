import * as process from 'process';
import { TokenValidation } from 'nest-keycloak-connect';

export const keycloakConfig = {
  clientId: process.env.CLIENT_ID || 'front_app',
  authServerUrl:
    process.env.AUTH_SERVER_URL || 'http://keycloak.prolinkticdev.linktic.com',
  realm: process.env.REALM || 'SGDEA',
  secret: process.env.SECRET || 'J99Vbd8LgMjwTmtPZc0sjSbUhbpTfKlK',
  tokenValidation: TokenValidation.ONLINE,
};
