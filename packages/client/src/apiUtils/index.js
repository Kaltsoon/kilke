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
