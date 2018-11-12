import { createAction } from 'redux-actions';
import { getFormValues } from 'redux-form';

export const UPDATE_BY_ID = 'pumps/UPDATE_BY_ID';

export const updateById = createAction(UPDATE_BY_ID);

export const fetchById = id => async (dispatch, getState, { apiClient }) => {
  try {
    const response = await apiClient.get(`/v1/pumps/${id}`);

    if (response.data) {
      dispatch(updateById({ id, update: response.data }));
    }
  } catch (e) {}
};

export const updateRequest = update => async (
  dispatch,
  getState,
  { apiClient },
) => {
  const { id, ...rest } = update;

  try {
    const response = await apiClient.put(`/v1/pumps/${id}`, rest);

    if (response.data) {
      dispatch(updateById({ id, update: response.data }));
    }
  } catch (e) {}
};

export const submitConfiguration = id => (dispatch, getState) => {
  const state = getState();

  const { status, minRpm, maxRpm, manualRpm } = getFormValues(
    `pumpConfigurationForm.${id}`,
  )(state);

  return dispatch(updateRequest({ id, status, minRpm, maxRpm, manualRpm }));
};
