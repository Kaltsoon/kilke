import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import {
  selectTypeData,
  updateFilterPreset,
  refetch,
} from '../../state/charts';

import ChartContainer from '../ChartContainer';
import ChartAverage from '../ChartAverage';
import CalibrationModal from '../CalibrationModal';

import { themeProp } from '../../theme';

const CalibrateIcon = styled(Icon).attrs({ children: 'tune' })`
  margin-right: ${themeProp('spacing.unit')}px;
`;

const renderCalibrationButton = ({ onToggle }) => (
  <Button color="primary" variant="contained" onClick={onToggle}>
    <CalibrateIcon />
    Calibrate
  </Button>
);

export default compose(
  connect(
    (state, { type }) => ({
      data: selectTypeData(state, type),
    }),
    (dispatch, { type }) => ({
      onFilterPresetChange: e => {
        const filterPreset = e.target.value;

        dispatch(updateFilterPreset({ type, filterPreset }));
        dispatch(refetch(type));
      },
    }),
  ),
  withProps(({ type, onFilterPresetChange, calibratable, data: typeData }) => {
    const { options, averages, data, filterPreset, unit = '' } = typeData || {};

    let average = null;
    let filters = null;
    let actions = null;

    if (options && options.from && options.to && averages) {
      const timespan =
        new Date(options.to).getTime() - new Date(options.from).getTime();

      average = (
        <ChartAverage
          timespan={timespan}
          current={averages.current || 0}
          previous={averages.previous || 0}
          unit={unit}
        />
      );
    }

    if (data) {
      filters = (
        <Select value={filterPreset} onChange={onFilterPresetChange}>
          <MenuItem value="realTime">Real-time</MenuItem>
          <MenuItem value="lastHour">Last hour</MenuItem>
          <MenuItem value="last24Hours">Last 24 hours</MenuItem>
        </Select>
      );
    }

    if (calibratable) {
      actions = (
        <CalibrationModal type={type}>
          {renderCalibrationButton}
        </CalibrationModal>
      );
    }

    return {
      average,
      filters,
      actions,
    };
  }),
)(ChartContainer);
