import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  selectTypeData,
  refetch,
  selectChartOptions,
} from '../../state/charts';

import Chart from '../Chart';

const SpinContainer = styled.div.attrs({
  children: <CircularProgress />,
})`
  text-align: center;
`;

const ApiChart = ({ options, type, pollInterval = null, loading }) => {
  return loading && !options.series ? (
    <SpinContainer />
  ) : (
    <Chart options={options} />
  );
};

export default compose(
  withState('interval', 'setInterval', null),
  connect(
    (state, { type }) => {
      const typeData = selectTypeData(state, type);
      const options = selectChartOptions(state, type);

      return {
        options,
        loading: typeData.loading || false,
        pollInterval: typeData ? typeData.pollInterval : null,
      };
    },
    (dispatch, { type }) => {
      return {
        onRefetch: () => dispatch(refetch(type)),
      };
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.onRefetch();

      if (this.props.pollInterval) {
        clearInterval(this.props.interval);

        this.props.setInterval(
          setInterval(() => this.props.onRefetch(), this.props.pollInterval),
        );
      }
    },
    componentWillUnmount() {
      clearInterval(this.props.interval);
    },
    componentDidUpdate({ type, pollInterval }) {
      if (type !== this.props.type) {
        this.props.onRefetch();
      }

      if (this.props.pollInterval && pollInterval !== this.props.pollInterval) {
        clearInterval(this.props.interval);

        this.props.setInterval(
          setInterval(() => this.props.onRefetch(), this.props.pollInterval),
        );
      }

      if (!this.props.pollInterval) {
        clearInterval(this.props.interval);
      }
    },
  }),
)(ApiChart);
