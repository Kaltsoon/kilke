import React, { Fragment } from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';

import ApiChartContainer from '../ApiChartContainer';
import ApiChart from '../ApiChart';

const PhChartsPage = () => {
  return (
    <ChartGrid>
      <ChartGridItem>
        <ApiChartContainer
          title={
            <Fragment>
              pH<sub>feed</sub>
            </Fragment>
          }
          type="phf"
          calibratable
        >
          <ApiChart type="phf" />
        </ApiChartContainer>
      </ChartGridItem>

      <ChartGridItem>
        <ApiChartContainer
          title={
            <Fragment>
              pH<sub>draw</sub>
            </Fragment>
          }
          type="phd"
          calibratable
        >
          <ApiChart type="phd" />
        </ApiChartContainer>
      </ChartGridItem>
    </ChartGrid>
  );
};

export default PhChartsPage;
