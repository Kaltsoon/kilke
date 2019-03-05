import axios from 'axios';
import { createTcpClientObservable, makeOutputObservable } from './utils';

export const sendPumpConfiguration = ({ input, configuration = null }) => {
  return input.sendMessage({
    type: 'pump_configuration',
    payload: configuration,
  });
};

export const createTcpOutput = ({ host, port, onError = () => {} }) => {
  const observable = makeOutputObservable(
    createTcpClientObservable({
      host,
      port,
      onError,
    }),
  );

  return {
    observable() {
      return observable;
    },
  };
};

export const createHttpInput = ({ url }) => {
  const client = axios.create({
    baseURL: url,
  });

  return {
    sendMessage: async message => {
      const { data } = await client.post('/', message);

      return data;
    },
  };
};
