import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import merge from 'lodash/merge';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  selectTypeData,
  refetch,
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
    (state, { type, options = {} }) => {
      const typeData = selectTypeData(state, type);

      return {
        options: merge({}, options, {
          series: [{ data: typeData ? typeData.data : [] }],
        }),
        loading: typeData.loading || false,
        pollInterval: typeData ? typeData.pollInterval : null,
      };
    },
    (dispatch, { type, pollInterval }) => {
      return {
        onRefetch: () => dispatch(refetch(type)),
      };
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.onRefetch();

      if (this.props.pollInterval) {
        this.props.interval && clearInterval(this.props.interval);
        this.props.setInterval(
          setInterval(() => this.props.onRefetch(), this.props.pollInterval),
        );
      }
    },
    componentWillUnmount() {
      this.props.onStopPoll();
    },
    componentDidUpdate({ type, pollInterval }) {
      if (type !== this.props.type) {
        this.props.onRefetch();
      }

      if (this.props.pollInterval && pollInterval !== this.props.pollInterval) {
        this.props.interval && clearInterval(this.props.interval);
        this.props.setInterval(
          setInterval(() => this.props.onRefetch(), this.props.pollInterval),
        );
      }

      if (!this.props.pollInterval) {
        this.props.interval && clearInterval(this.props.interval);
      }
    },
  }),
)(ApiChart);
