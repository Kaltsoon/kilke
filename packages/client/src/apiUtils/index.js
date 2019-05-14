export const getSensorChart = async ({
  apiClient,
  type,
  from,
  to,
  systemId,
}) => {
  const params = {};

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  const { data } = await apiClient.get(
    `/v1/systems/${systemId}/charts/${type}`,
    { params },
  );

  return data;
};

export const getLatestSensorMeasurement = async ({
  apiClient,
  type,
  systemId,
}) => {
  const { data } = await apiClient.get(
    `/v1/systems/${systemId}/sensor-measurements/${type}?limit=1`,
  );

  return data ? data[0] : null;
};

export const getLatestPumpMeasurement = async ({
  apiClient,
  type,
  systemId,
}) => {
  const { data } = await apiClient.get(
    `/v1/systems/${systemId}/pump-measurements/${type}?limit=1`,
  );

  return data ? data[0] : null;
};

export const getLatestBinarySensorMeasurement = async ({
  apiClient,
  type,
  systemId,
}) => {
  const { data } = await apiClient.get(
    `/v1/systems/${systemId}/binary-sensor-measurements/${type}?limit=1`,
  );

  return data ? data[0] : null;
};

export const getPumpConfiguration = async ({ apiClient, type, systemId }) => {
  const { data } = await apiClient.get(`/v1/systems/${systemId}/pumps/${type}`);

  return data;
};

export const getSensorMeasurementLog = async ({
  apiClient,
  from,
  to,
  limit,
  types,
  systemId,
}) => {
  const params = {
    ...(from && { from }),
    ...(to && { to }),
    ...(limit && { limit }),
    ...(types && { types: types.join(',') }),
  };

  const { data } = await apiClient.get(
    `/v1/systems/${systemId}/sensor-measurements/log`,
    { params },
  );

  return data;
};

export const getSystem = async ({ apiClient, id }) => {
  const { data } = await apiClient.get(`/v1/systems/${id}`);

  return data;
};

export const updateSystem = async ({ apiClient, systemId, update }) => {
  const { data } = await apiClient.put(`/v1/systems/${systemId}`, update);

  return data;
};
