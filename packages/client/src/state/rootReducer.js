import { combineReducers } from 'redux';

import charts from './charts';
import config from './config';
import calibrations from './calibrations';
import pumps from './pumps';

export default (reducers = {}) =>
  combineReducers({
    ...reducers,
    charts,
    config,
    calibrations,
    pumps,
  });
