import merge from 'lodash/merge';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import flatMap from 'lodash/flatMap';
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

const defaultTheme = {
  palette: {
    primary: createPalette(primaryColor),
    success: createPalette(successColor),
    danger: createPalette(dangerColor),
    error: createPalette(dangerColor),
  },
};

const createTheme = (theme = {}) => {
  return createMuiTheme(merge({}, defaultTheme, theme));
};

export const themeProp = path => props => get(props, typeof path === 'string' ? `theme.${path}` : ['theme', ...path]);

export const px = val => `${val}px`;

export const rem = val => `${val}rem`;

export const getSpacingStyles = props => {
  if (!props.theme) {
    return {};
  }

  const directions = ['Top', 'Bottom', 'Left', 'Right'];
  const attributes = ['margin', 'padding'];

  const styles = pick(
    props,
    flatMap(attributes, attr => [attr, ...directions.map(dir => `${attr}${dir}`)]),
  );

  return mapValues(
    styles,
    val => {
      const amount = typeof val === 'number' ? props.theme.spacing.unit * val : props.theme.spacing.unit;

      return `${amount}px`;
    },
  );
};

export default createTheme;
