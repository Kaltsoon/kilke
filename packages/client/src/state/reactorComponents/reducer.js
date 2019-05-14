import { createReducer } from 'redux-create-reducer';

import { UPDATE_POSITION } from './actions';

const initialState = {
  positions: {},
};

export default createReducer(initialState, {
  [UPDATE_POSITION](
    state,
    {
      payload: { id, position },
    },
  ) {
    return {
      ...state,
      positions: {
        ...state.positions,
        [id]: {
          ...(state.positions[id] || {}),
          ...position,
        },
      },
    };
  },
});
