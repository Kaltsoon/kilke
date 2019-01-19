import { createAction } from 'redux-actions';

export const UPDATE_TYPE = 'charts/UPDATE_TYPE';

export const updateType = createAction(UPDATE_TYPE);

export const updateFilterPreset = ({ type, filterPreset }) => dispatch => {
  dispatch(
    updateType({
      type,
      update: { filterPreset },
    }),
  );
};
