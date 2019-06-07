import axios from 'axios';

const createApiClient = ({ httpClient = axios, url } = {}) => {
  return httpClient.create({
    baseURL: url,
    timeout: 5000,
  });
};

export default createApiClient;
