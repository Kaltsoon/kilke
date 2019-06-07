const updateSystem = async ({ apiClient, systemId, update }) => {
  const { data } = await apiClient.put(`/v1/systems/${systemId}`, update);

  return data;
};

export default updateSystem;
