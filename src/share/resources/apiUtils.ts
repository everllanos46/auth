import axios from 'axios';

export const login = async (
  user: string,
  password: string,
  keycloakBaseUrl: string,
) => {
  const tokenEndpoint = `${keycloakBaseUrl}/realms/master/protocol/openid-connect/token`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams({
    username: user,
    password: password,
    grant_type: 'password',
    client_id: 'admin-cli',
  });

  try {
    const response = await axios.post(tokenEndpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
