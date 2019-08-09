import axios from 'axios';

export class ApiClient {
  constructor({ url }) {
    this.client = axios.create({
      baseURL: url,
    });
  }

  getSystem(systemId) {
    return this.client.get(`/v1/systems/${systemId}`).then(({ data }) => data);
  }

  getPumpControllerState(systemId) {
    return this.client
      .get(`/v1/pump-controllers/${systemId}/state`)
      .then(({ data }) => data);
  }
}

export default ApiClient;
