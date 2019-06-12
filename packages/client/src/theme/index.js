import merge from 'lodash/merge';
import get from 'lodash/get';
import { darken, lighten } from 'polished';
import { createMuiTheme } from '@material-ui/core/styles';

const createPalette = (color, contrastText = '#ffffff') => {
  return {
    light: lighten(0.2, color),
    main: color,
    dark: darken(0.2, color),
    contrastText,
  };
};

const primaryColor = '#1483fb';
const successColor = '#66c54b';
const dangerColor = '#e93f33';
const secondaryColor = '#eeeeee';

const defaultTheme = {
  palette: {
    primary: createPalette(primaryColor),
    success: createPalette(successColor),
    danger: createPalette(dangerColor),
    error: createPalette(dangerColor),
    secondary: createPalette(secondaryColor, '#545454'),
  },
};

const createTheme = (theme = {}) => {
  return createMuiTheme(
    merge(
      {
        typography: {
          useNextVariants: true,
        },
      },
      defaultTheme,
      theme,
    ),
  );
};

export const themeProp = path => props =>
  get(props, typeof path === 'string' ? `theme.${path}` : ['theme', ...path]);

export const px = val => `${val}px`;

export const rem = val => `${val}rem`;

export const spacing = amount => ({ theme }) => {
  return px(theme.spacing(amount));
};

export default createTheme;
