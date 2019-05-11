import { useMemo } from 'react';

import { createConfig } from '../../chart';

const defaultChartConfig = createConfig()
  .type('areaspline')
  .xAxisType('datetime')
  .xAxisTitle('Time')
  .yAxisTitle('Value');

export const useSensorChartConfig = sensor => {
  return useMemo(
    () => {
      if (!sensor) {
        return null;
      }

      let chartConfig = defaultChartConfig;

      if (sensor.unitFullName) {
        chartConfig = chartConfig.yAxisTitle(sensor.unitFullName);
      }

      return chartConfig.toObject();
    },
    [sensor],
  );
};

export default useSensorChartConfig;
