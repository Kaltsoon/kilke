import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './rootReducer';
import { persistStore } from 'redux-persist';

export default ({ httpClient, apiClient, preloadedState, history }) => {
  const context = {
    httpClient,
    apiClient,
    history,
  };

  const rootReducer = createRootReducer({});

  const middleware = applyMiddleware(thunk.withExtraArgument(context));

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(compose(middleware)),
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
