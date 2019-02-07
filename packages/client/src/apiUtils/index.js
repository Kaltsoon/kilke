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
