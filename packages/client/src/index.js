import './icons.sass';

import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import createBrowserHistory from 'history/createBrowserHistory';

import { createApiClient } from './api';
import App from './components/App';
import createStore from './state';
import createTheme from './theme';
import { update as updateConfig } from './state/config';

import * as serviceWorker from './serviceWorker';

serviceWorker.unregister();

const history = createBrowserHistory();
const apiClient = createApiClient({ url: process.env.REACT_APP_API_URL });

const store = createStore({
  httpClient: axios,
  apiClient,
  history,
});

const theme = createTheme();

(async () => {
  const { data: config } = await apiClient.get('/v1/config');

  store.dispatch(updateConfig(config));

  render(
    <App store={store} theme={theme} history={history} apiClient={apiClient} />,
    document.getElementById('root'),
  );
})();
