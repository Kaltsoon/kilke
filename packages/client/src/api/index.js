import axios from 'axios';

export const createApiClient = ({ httpClient = axios, url } = {}) => {
  return httpClient.create({
    baseURL: `${url}/api`,
  });
};
