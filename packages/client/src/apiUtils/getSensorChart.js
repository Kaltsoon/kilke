const getSensorChart = async ({ apiClient, type, from, to, systemId }) => {
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

export default getSensorChart;
