import axios from 'axios';
import { ApiConfig } from './types';

export const createApiCall = (apiConfig: ApiConfig) => async () => {
  const { url, method = 'GET' } = apiConfig;
  const headers = {
    'Content-Type': 'application/json',
  };

  const axiosConfig = {
    method,
    headers,
    url,
  };

  return axios(axiosConfig);
};
