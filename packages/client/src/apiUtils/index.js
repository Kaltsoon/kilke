export const getSensorChart = async ({ apiClient, type, from, to }) => {
  const params = {};

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  const { data } = await apiClient.get(`/v1/charts/${type}`, { params });

  return data;
};

export const getLatestSensorMeasurement = async ({ apiClient, type }) => {
  const { data } = await apiClient.get(
    `/v1/sensors/${type}/measurements?limit=1`,
  );

  return data ? data[0] : null;
};

export const getPumpConfiguration = async ({ apiClient, type }) => {
  const { data } = await apiClient.get(`/v1/pumps/${type}`);

  return data;
};

export const updateConfig = ({ apiClient, config = {} }) => {
  return apiClient.put('/v1/config', config);
};

export const getSensorMeasurementLog = async ({
  apiClient,
  from,
  to,
  limit,
  types,
}) => {
  const params = {
    ...(from && { from }),
    ...(to && { to }),
    ...(limit && { limit }),
    ...(types && { types: types.join(',') }),
  };

  const { data } = await apiClient.get('/v1/sensors/log', { params });

  return data;
};
