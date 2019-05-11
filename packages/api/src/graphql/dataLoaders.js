import DataLoader from 'dataloader';
import { camelCase, isArray, find, zipObject } from 'lodash';

const createModelLoader = Model =>
  new DataLoader(async ids => {
    const idColumns = isArray(Model.idColumn)
      ? Model.idColumn
      : [Model.idColumn];

    const camelCasedIdColumns = idColumns.map(id => camelCase(id));

    const results = await Model.query().findByIds(ids);

    return ids.map(
      id =>
        find(
          results,
          zipObject(camelCasedIdColumns, isArray(id) ? id : [id]),
        ) || null,
    );
  });

export const createDataLoaders = ({ models }) => {
  return {
    systemLoader: createModelLoader(models.System),
    pumpLoader: createModelLoader(models.Pump),
  };
};

export default createDataLoaders;
