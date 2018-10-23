import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../GlobalStyle';
import MainPage from '../MainPage';

const App = ({ store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <MainPage />
      </Fragment>
    </ThemeProvider>
  </Provider>
);

export default App;
