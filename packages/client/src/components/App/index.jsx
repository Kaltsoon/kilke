import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../GlobalStyle';

const App = ({ store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        Hello world!
      </Fragment>
    </ThemeProvider>
  </Provider>
);

export default App;
