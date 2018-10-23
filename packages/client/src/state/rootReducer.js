import { combineReducers } from 'redux';

import charts from './charts'

export default (reducers = {}) =>
  combineReducers({
    ...reducers,
    charts,
  });
