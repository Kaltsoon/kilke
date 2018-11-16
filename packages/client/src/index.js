import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import store from './state';
import createTheme from './theme';

import * as serviceWorker from './serviceWorker';

const theme = createTheme();

render(<App store={store} theme={theme} />, document.getElementById('root'));

serviceWorker.unregister();
