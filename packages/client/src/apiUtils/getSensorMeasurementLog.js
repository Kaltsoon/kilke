const getSensorMeasurementLog = async ({
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

export default getSensorMeasurementLog;
