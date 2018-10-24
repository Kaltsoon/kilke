import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { selectTypeData } from '../../state/charts';
import ChartContainer from '../ChartContainer';
import ChartAverage from '../ChartAverage';

export default connect((state, { type, unit = '' }) => {
  const typeData = selectTypeData(state, type);

  let newProps = {};

  if (!typeData) {
    return newProps;
  }

  const { options, averages, data } = typeData;

  if (options && options.from && options.to && averages) {
    const timespan =
      new Date(options.to).getTime() - new Date(options.from).getTime();

    newProps = {
      ...newProps,
      average: (
        <ChartAverage
          timespan={timespan}
          current={averages.current}
          previous={averages.previous}
          unit={unit}
        />
      ),
    };
  }

  if (data) {
    newProps = {
      ...newProps,
      filters: (
        <Select
          value="realTime"
        >
          <MenuItem value="realTime">Real-time</MenuItem>
          <MenuItem value="lastHour">Last hour</MenuItem>
          <MenuItem value="last24Hours">Last 24 hours</MenuItem>
        </Select>
      ),
    };
  }

  return newProps;
})(ChartContainer);
