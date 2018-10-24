import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

import createTheme from '../src/theme';

const theme = createTheme();

const themeDecorator = storyFn => (
  <MuiThemeProvider>
    <ThemeProvider theme={theme}>
      {storyFn()}
    </ThemeProvider>
  </MuiThemeProvider>
);

addDecorator(themeDecorator);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src', true, /stories\.jsx?$/));
}

configure(loadStories, module);
