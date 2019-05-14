import { useMemo, useCallback } from 'react';

import { createConfig } from '../../chart';
import useSensor from '../useSensor';
import { getSensorChart } from '@/apiUtils';
import { usePollingApiAsync } from '../useApiAsync';

const defaultChartConfig = createConfig()
  .type('areaspline')
  .xAxisType('datetime')
  .xAxisTitle('Time')
  .yAxisTitle('Value');

const useSensorChartConfig = sensor => {
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

export const useSensorChart = ({
  pollInterval = null,
  type,
  systemId,
  getQuery = () => ({}),
}) => {
  const { sensor } = useSensor({ type, systemId });
  const config = useSensorChartConfig(sensor);

  const getSensorChartPromiseFn = useCallback(
    ({ apiClient, systemId }) => {
      return getSensorChart({
        apiClient,
        type,
        systemId,
        ...getQuery(),
      });
    },
    [getQuery],
  );

  const { data } = usePollingApiAsync({
    promiseFn: getSensorChartPromiseFn,
    type,
    watch: type,
    pollInterval,
  });

  return { data, config };
};

export default useSensorChart;
