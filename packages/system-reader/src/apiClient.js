import axios from 'axios';

export class ApiClient {
  constructor({ url }) {
    this.client = axios.create({
      baseURL: url,
    });
  }

  createSensorMeasurements({ measurements, systemId }) {
    return this.client
      .post(`/v1/systems/${systemId}/sensor-measurements`, measurements)
      .then(({ data }) => data);
  }

  updatePump({ systemId, type, update }) {
    return this.client
      .put(`/v1/systems/${systemId}/pumps/${type}`, update)
      .then(({ data }) => data);
  }
}

export default ApiClient;
