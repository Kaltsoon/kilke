import { createAction } from 'redux-actions';

export const UPDATE_TYPE = 'charts/UPDATE_TYPE';

const oneHour = 3600000;
const oneDay = 86400000;

const getFilterByPreset = preset => {
  const map = {
    realTime: {},
    lastHour: {
      from: new Date().getTime() - oneHour,
      to: new Date().getTime(),
    },
    last24Hours: {
      from: new Date().getTime() - oneDay,
      to: new Date().getTime(),
    },
  };

  return map[preset] || {};
};

export const updateType = createAction(UPDATE_TYPE);

export const updateFilterPreset = ({ type, filterPreset }) => dispatch => {
  const pollInterval = filterPreset === 'realTime' ? 5000 : null;

  dispatch(
    updateType({
      type,
      update: { pollInterval, filterPreset },
    }),
  );
};

export const refetch = type => async (dispatch, getState, { apiClient }) => {
  const state = getState();

  const { api, filterPreset } = state.charts.types[type] || {};

  if (!api) {
    return;
  }

  dispatch(
    updateType({
      type,
      update: {
        loading: true,
      },
    }),
  );

  const filter = getFilterByPreset(filterPreset);

  const response = await apiClient.get(api, {
    params: {
      ...(filter.from && { from: new Date(filter.from).toISOString() }),
      ...(filter.to && { to: new Date(filter.to).toISOString() }),
    },
  });

  dispatch(
    updateType({
      type,
      update: {
        loading: false,
        data: response.data.data || null,
        averages: response.data.averages,
        options: response.data.options,
        unit: response.data.unit,
      },
    }),
  );
};
