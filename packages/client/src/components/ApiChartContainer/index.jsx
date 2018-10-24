import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { selectTypeData, updateFilterPreset, refetch } from '../../state/charts';
import ChartContainer from '../ChartContainer';
import ChartAverage from '../ChartAverage';

export default compose(
  connect(
    null,
    (dispatch, { type }) => ({
      onFilterPresetChange: e => {
        const filterPreset = e.target.value;

        dispatch(updateFilterPreset({ type, filterPreset }));
        dispatch(refetch(type));
      },
    }),
  ),
  connect((state, { type, unit = '', onFilterPresetChange }) => {
    const typeData = selectTypeData(state, type);

    let newProps = {};

    if (!typeData) {
      return newProps;
    }

    const { options, averages, data, filterPreset } = typeData;

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
          <Select value={filterPreset} onChange={onFilterPresetChange}>
            <MenuItem value="realTime">Real-time</MenuItem>
            <MenuItem value="lastHour">Last hour</MenuItem>
            <MenuItem value="last24Hours">Last 24 hours</MenuItem>
          </Select>
        ),
      };
    }

    return newProps;
  }),
)(ChartContainer);
