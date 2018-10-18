import merge from 'lodash/merge';
import get from 'lodash/get';

export const themeProp = path => props => get(props, typeof path === 'string' ? `theme.${path}` : ['theme', ...path]);

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
  },
  borderRadius: {
    base: '4px',
  },
  typography: {
    lineHeight: 1.5,
    fontSize: '16px',
    fontFamily,
    secondary: {
      fontSize: '0.75em',
      color: secondaryTextColor,
    },
    paragraph: {
      marginBottom: '24px',
      marginTop: '0px',
    },
    heading: {
      fontFamily,
      color: headingColor,
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

export default createTheme;
