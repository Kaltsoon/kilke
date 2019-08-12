const updatePump = async ({ apiClient, systemId, type, update }) => {
  const { data } = await apiClient.put(
    `/v1/systems/${systemId}/pumps/${type}`,
    update,
  );

  return data;
};

export default updatePump;
