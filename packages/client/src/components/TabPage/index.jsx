import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ChartGrid, { ChartGridItem } from '../ChartGrid';
import { selectTabSensorsArray } from '../../state/config';

import ApiChartContainer from '../ApiChartContainer';

const TabPage = ({ sensors }) => {
  return (
    <ChartGrid>
      {sensors.map(({ key, title, subtitle }) => (
        <ChartGridItem key={key}>
          <ApiChartContainer
            title={
              <Fragment>
                {title}
                {subtitle ? <sub>{subtitle}</sub> : null}
              </Fragment>
            }
            type={key}
          />
        </ChartGridItem>
      ))}
    </ChartGrid>
  );
};

export default connect((state, { match }) => {
  return {
    sensors: selectTabSensorsArray(state, match.params.tab),
  };
})(TabPage);
