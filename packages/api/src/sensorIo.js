import axios from 'axios';

export const sendMessage = ({ client, message }) => {
  client.post('/', message);
};

export const sendPumpConfiguration = ({ client, configuration = null }) => {
  return sendMessage({
    client,
    message: {
      type: 'pump_configuration',
      payload: configuration,
    },
  });
};

export const createClient = ({ url }) => {
  return axios.create({
    baseURL: url,
  });
};

export const createApi = ({ client }) => {
  return {
    sendMessage: args => sendMessage({ client, ...args }),
    sendPumpConfiguration: args => sendPumpConfiguration({ client, ...args }),
  };
};

export default createClient;
