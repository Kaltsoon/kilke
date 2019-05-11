export const resolveSystem = ({ systemId }, args, { dataLoaders }) => {
  return systemId ? dataLoaders.systemLoader.load(systemId) : null;
};
