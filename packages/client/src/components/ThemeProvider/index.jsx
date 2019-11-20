import React from 'react';
import { ThemeProvider as ScThemeProvider } from 'styled-components';

import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';

const ThemeProvider = ({ theme, children }) => (
  <StylesProvider injectFirst>
    <ScThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ScThemeProvider>
  </StylesProvider>
);

export default ThemeProvider;
