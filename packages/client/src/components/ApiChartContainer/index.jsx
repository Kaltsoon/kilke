import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import get from 'lodash/get';
import isString from 'lodash/isString';

import { updateFilterPreset } from '../../state/charts';
import ChartContainer from '../ChartContainer';
import ChartAverage from '../ChartAverage';
import Chart from '../Chart';
import useSensorChart from '@/hooks/useSensorChart';

const oneHour = 3600000;
const oneDay = 86400000;

const refreshIntervalByFilterPreset = {
  realTime: 5000,
  lastHour: 60000,
  last24Hours: 600000,
};

const getQueryByFilterPreset = preset => {
  if (preset === 'lastHour') {
    return { from: new Date(new Date() - oneHour).toISOString() };
  } else if (preset === 'last24Hours') {
    return { from: new Date(new Date() - oneDay).toISOString() };
  }

  return {};
};

const getRefreshIntervalByFilterPreset = filterPreset => {
  const { realTime } = refreshIntervalByFilterPreset;

  return isString(filterPreset)
    ? refreshIntervalByFilterPreset[filterPreset] || realTime
    : realTime;
};

const MemoChart = memo(({ series, chartConfig }) => {
  const options = {
    ...(chartConfig || {}),
    ...(series ? { series: { name: 'Value', data: series } } : {}),
  };

  return <Chart options={options} />;
});

const renderAverage = ({ data, unit }) => {
  if (get(data, 'options') && get(data, 'averages')) {
    const { options, averages } = data;

    const timespan =
      new Date(options.to).getTime() - new Date(options.from).getTime();

    return (
      <ChartAverage
        timespan={timespan}
        current={averages.current || 0}
        previous={averages.previous || 0}
        unit={unit}
      />
    );
  }

  return null;
};

const renderChart = ({ data, chartConfig }) => {
  const series = data ? data.data || [] : [];

  return <MemoChart series={series} chartConfig={chartConfig} />;
};

const renderFilters = ({ onFilterPresetChange, filterPreset }) => {
  return (
    <Select value={filterPreset} onChange={onFilterPresetChange}>
      <MenuItem value="realTime">Real-time</MenuItem>
      <MenuItem value="lastHour">Last hour</MenuItem>
      <MenuItem value="last24Hours">Last 24 hours</MenuItem>
    </Select>
  );
};

const ApiChartContainer = ({
  onFilterPresetChange,
  filterPreset,
  sensor,
  ...props
}) => {
  const filters = renderFilters({ filterPreset, onFilterPresetChange });
  const refreshInterval = getRefreshIntervalByFilterPreset(filterPreset);

  const getQuery = useMemo(
    () => {
      return () => getQueryByFilterPreset(filterPreset);
    },
    [filterPreset],
  );

  const { data, config: chartConfig } = useSensorChart({
    type: sensor.type,
    pollInterval: refreshInterval,
    getQuery,
  });

  const unit = sensor ? sensor.unitShortName : null;
  const average = renderAverage({ data, unit });
  const chart = chartConfig ? renderChart({ data, chartConfig }) : null;

  return (
    <ChartContainer average={average} filters={filters} {...props}>
      {chart}
    </ChartContainer>
  );
};

export default compose(
  connect(
    (state, { sensor }) => ({
      filterPreset:
        get(state, ['charts', 'types', sensor.type, 'filterPreset']) ||
        'realTime',
    }),
    (dispatch, { sensor }) => ({
      onFilterPresetChange: e => {
        dispatch(
          updateFilterPreset({
            type: sensor.type,
            filterPreset: e.target.value,
          }),
        );
      },
    }),
  ),
)(ApiChartContainer);
