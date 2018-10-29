import { createAction } from 'redux-actions';
import get from 'lodash/get';
import { getFormValues } from 'redux-form';

export const UPDATE_BY_ID = 'calibrations/UPDATE_BY_ID';
export const UPDATE_LATEST_BY_TYPE = 'calibrations/UPDATE_LATEST_BY_TYPE';

export const updateById = createAction(UPDATE_BY_ID);

export const updateLatestByType = createAction(UPDATE_LATEST_BY_TYPE);

export const fetchLatestByType = type => async (dispatch, getState, { apiClient }) => {
  dispatch(updateLatestByType({
    type,
    update: { loading: true },
  }));

  const response = await apiClient.get(`/v1/sensors/${type}/calibrations?limit=1`);

  const { data } = response;

  const calibration = data.length > 0 ? data[0] : null;

  if (calibration) {
    dispatch(updateById({
      id: calibration.id,
      update: calibration,
    }));
  }

  dispatch(updateLatestByType({
    type,
    update: { loading: false, data: calibration ? calibration.id : null },
  }));
};

export const createCalibration = calibration => async (dispatch, getState, { apiClient }) => {
  const { type, ...rest } = calibration;

  const response = await apiClient.post(`/v1/sensors/${type}/calibrations`, rest);

  if (get(response, 'data.id')) {
    dispatch(updateById({
      id: response.data.id,
      update: response.data,
    }));

    dispatch(updateLatestByType({
      type,
      update: { data: response.data.id },
    }));
  }

  return response.data;
};

export const submitCalibration = type => (dispatch, getState) => {
  const state = getState();

  const { x1, y1, x2, y2 } = getFormValues(`calibrationForm.${type}`)(state);

  return dispatch(createCalibration({ type, x1, y1, x2, y2 }));
};
