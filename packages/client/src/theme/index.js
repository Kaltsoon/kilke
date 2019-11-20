import get from 'lodash/get';
import { darken, lighten } from 'polished';
import { createMuiTheme } from '@material-ui/core/styles';

const createPaletteVariants = (color, contrastText = '#ffffff') => {
  return {
    light: lighten(0.2, color),
    main: color,
    dark: darken(0.2, color),
    contrastText,
  };
};

const createPalette = () => {
  const primaryColor = '#1483fb';
  const successColor = '#66c54b';
  const dangerColor = '#e93f33';
  const secondaryColor = '#eeeeee';

  return {
    primary: createPaletteVariants(primaryColor),
    success: createPaletteVariants(successColor),
    danger: createPaletteVariants(dangerColor),
    error: createPaletteVariants(dangerColor),
    secondary: createPaletteVariants(secondaryColor, '#545454'),
    background: {
      default: '#eeeeee',
    },
  };
};

const createTheme = () => {
  return createMuiTheme({
    palette: createPalette(),
  });
};

export const themeProp = path => props =>
  get(props, typeof path === 'string' ? `theme.${path}` : ['theme', ...path]);

export const px = val => `${val}px`;

export const rem = val => `${val}rem`;

export const spacing = amount => ({ theme }) => {
  return px(theme.spacing(amount));
};

export default createTheme;
