import { createReducer } from 'redux-create-reducer';

import { UPDATE } from './actions';

const initialState = {};

export default createReducer(initialState, {
  [UPDATE](state, { payload }) {
    return { ...state, ...payload };
  },
});
