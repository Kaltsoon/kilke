import merge from 'lodash/merge';

const createChartConfig = (config = {}) => {
  return {
    type(type) {
      return createChartConfig(merge({}, config, { chart: { type } }));
    },
    unit(unit) {
      return createChartConfig(
        merge({}, config, {
          tooltip: {
            valueSuffix: ` ${unit}`,
          },
        }),
      );
    },
    xAxisType(type) {
      return createChartConfig(merge({}, config, { xAxis: { type } }));
    },
    xAxisTitle(title) {
      return createChartConfig(
        merge({}, config, { xAxis: { title: { text: title } } }),
      );
    },
    yAxisType(type) {
      return createChartConfig(merge({}, config, { yAxis: { type } }));
    },
    yAxisTitle(title) {
      return createChartConfig(
        merge({}, config, { yAxis: { title: { text: title } } }),
      );
    },
    toObject() {
      return { ...config };
    },
  };
};

export default createChartConfig;
