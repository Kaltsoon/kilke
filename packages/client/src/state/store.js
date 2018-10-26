import { createStore, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import routesMap from '../routes';
import { createApiClient } from '../api';
import createRootReducer from './rootReducer';

const context = {
  httpClient: axios,
  apiClient: createApiClient({ url: process.env.REACT_APP_API_URL }),
};

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(routesMap, { notFoundPath: '/' });

const rootReducer = createRootReducer({
  location: routerReducer,
});

const middleware = applyMiddleware(
  routerMiddleware,
  thunk.withExtraArgument(context),
);

const preloadedState = window.__SERVER_STATE__ === '__SERVER_STATE__' ? undefined : window.__SERVER_STATE__;

const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    compose(
      routerEnhancer,
      middleware,
    ),
  ),
);

export default store;
