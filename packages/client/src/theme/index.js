import merge from 'lodash/merge';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import flatMap from 'lodash/flatMap';

const createPalette = (color, contrastText = '#ffffff') => {
  return {
    base: color,
    contrastText,
  };
};

const primaryColor = '#1483fb';
const successColor = '#66c54b';
const dangerColor = '#e93f33';
const baseTextColor = '#2d3149';
const headingColor = '#2d3149';
const secondaryTextColor = '#6580a6';
const fontFamily = "'Montserrat', sans-serif";

const defaultTheme = {
  palette: {
    primary: createPalette(primaryColor),
    success: createPalette(successColor),
    danger: createPalette(dangerColor),
    text: {
      base: baseTextColor,
      heading: headingColor,
      secondary: secondaryTextColor,
    },
    separator: '#d9dbe8',
    mainBackground: '#eff0f5',
  },
  borderRadius: {
    base: '4px',
  },
  typography: {
    lineHeight: 1.5,
    fontSize: '14px',
    fontFamily,
    secondary: {
      fontSize: '0.75em',
      color: secondaryTextColor,
    },
    paragraph: {
      marginBottom: '24px',
      marginTop: '0px',
    },
    headingFontSizes: [2.5, 2, 1.5, 1.25],
    heading: {
      lineHeight: 1.2,
      color: headingColor,
      marginBottom: '24px',
      marginTop: '0px',
    },
    link: {
      color: primaryColor,
      fontFamily,
    }
  },
  spacing: {
    unit: 24,
  },
};

const createTheme = (theme = {}) => {
  return merge({}, defaultTheme, theme);
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
