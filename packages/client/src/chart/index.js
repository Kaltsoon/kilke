import merge from 'lodash/merge';

export const createConfig = (config = {}) => {
  return {
    type(type) {
      return createConfig(merge({}, config, { chart: { type } }));
    },
    unit(unit) {
      return createConfig(
        merge({}, config, {
          tooltip: {
            valueSuffix: ` ${unit}`,
          },
        }),
      );
    },
    xAxisType(type) {
      return createConfig(merge({}, config, { xAxis: { type } }));
    },
    xAxisTitle(title) {
      return createConfig(
        merge({}, config, { xAxis: { title: { text: title } } }),
      );
    },
    yAxisType(type) {
      return createConfig(merge({}, config, { yAxis: { type } }));
    },
    yAxisTitle(title) {
      return createConfig(
        merge({}, config, { yAxis: { title: { text: title } } }),
      );
    },
    toObject() {
      return { ...config };
    },
  };
};
