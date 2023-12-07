import axios from 'axios';

export const login = async (
  user: string,
  password: string,
  keycloakBaseUrl: string,
  realm: string,
  client_id: string
) => {
  const tokenEndpoint = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams({
    username: user,
    password: password,
    grant_type: 'password',
    client_id: client_id,
  });

  try {
    const response = await axios.post(tokenEndpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (
  refresh_token: string,
  keycloakBaseUrl: string,
  realm: string,
  client_id: string
) => {
  const tokenEndpoint = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: client_id,
    refresh_token: refresh_token
  });

  try {
    const response = await axios.post(tokenEndpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
