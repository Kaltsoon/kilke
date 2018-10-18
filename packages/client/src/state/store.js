import { createStore, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import thunk from 'redux-thunk';

import routesMap from '../routes';
import { createApiClient } from '../api';
import createRootReducer from './rootReducer';

const history = createHistory();

const context = {
  httpClient: axios,
  apiClient: createApiClient({ url: process.env.REACT_APP_API_URL }),
};

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(history, routesMap);

const rootReducer = createRootReducer({
  location: routerReducer,
});

const middleware = applyMiddleware(
  routerMiddleware,
  thunk.withExtraArgument(context),
);

const store = createStore(
  rootReducer,
  compose(
    routerEnhancer,
    middleware,
  ),
);

export default store;
