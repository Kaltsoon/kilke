import { redirect } from 'redux-first-router';

import * as types from './types';

export default {
  [types.ROUTE_INDEX]: {
    path: '/',
    thunk: (dispatch, getState) => {},
  },
  [types.TAB]: '/tab/:key',
};
