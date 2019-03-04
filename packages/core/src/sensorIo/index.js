import axios from 'axios';
import { createTcpClientObservable, makeInputObservable } from './utils';

export const sendPumpConfiguration = ({ output, configuration = null }) => {
  return output.sendMessage({
    type: 'pump_configuration',
    payload: configuration,
  });
};

export const createClient = ({ url }) => {
  return axios.create({
    baseURL: url,
  });
};

export const createTcpInput = ({ host, port, onError = () => {} }) => {
  return makeInputObservable(
    createTcpClientObservable({
      host,
      port,
      onError,
    }),
  );
};

export const createHttpOutput = ({ url }) => {
  const client = axios.create({
    baseURL: url,
  });

  return {
    sendMessage: async message => {
      const { data } = client.post('/', message);

      return data;
    },
  };
};
