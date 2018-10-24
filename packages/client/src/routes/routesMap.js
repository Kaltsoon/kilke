import { redirect } from 'redux-first-router';

import * as types from './types';

export default {
  [types.ROUTES_INDEX]: {
    path: '/',
    thunk: (dispatch) => dispatch(redirect({ type: types.ROUTE_SENSORS })),
  },
  [types.ROUTE_SENSORS]: '/sensors',
};
