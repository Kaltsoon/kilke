const arrayToCsvString = arr => {
  return arr.reduce((acc, curr) => {
    return `${acc}${curr.join(';')}\n`;
  }, '');
};

export default arrayToCsvString;
