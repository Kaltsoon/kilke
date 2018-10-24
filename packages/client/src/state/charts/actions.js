import { createAction } from 'redux-actions';

export const UPDATE_TYPE = 'charts/UPDATE_TYPE';

export const updateType = createAction(UPDATE_TYPE);

export const refetch = type => async (dispatch, getState, { apiClient }) => {
  const state = getState();

  const { api } = state.charts.types[type] || {};

  if (!api) {
    return;
  }

  dispatch(updateType({
    type,
    update: {
      loading: true,
    },
  }));

  const response = await apiClient.get(api);

  dispatch(updateType({
    type,
    update: {
      loading: false,
      data: response.data.data || null,
      averages: response.data.averages,
      options: response.data.options,
    },
  }));
};

export const stopPoll = type => (dispatch, getState) => {
  const state = getState();

  const typeData = state.charts.types[type];

  if (!typeData) {
    return;
  }

  const { pollInterval: oldInterval } = typeData;

  if (oldInterval) {
    clearInterval(oldInterval);
  }
};

export const startPoll = ({ type, pollInterval = 1000 }) => (dispatch, getState) => {
  dispatch(stopPoll(type));

  const interval = setInterval(() => {
    dispatch(refetch(type));
  }, pollInterval);

  dispatch(updateType({ type, update: { pollInterval: interval } }));
};
