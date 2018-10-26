import React, { Fragment } from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';

import ApiChartContainer from '../ApiChartContainer';
import ApiChart from '../ApiChart';

const TemperatureChartsPage = () => {
  return (
    <ChartGrid>
      <ChartGridItem>
        <ApiChartContainer title="Conductivity" type="cond">
          <ApiChart type="cond" />
        </ApiChartContainer>
      </ChartGridItem>

      <ChartGridItem>
        <ApiChartContainer
          title={
            <Fragment>
              T<sub>conductivity</sub>
            </Fragment>
          }
          type="tco"
        >
          <ApiChart type="tco" />
        </ApiChartContainer>
      </ChartGridItem>

      <ChartGridItem>
        <ApiChartContainer
          title={
            <Fragment>
              T<sub>ambient</sub>
            </Fragment>
          }
          type="tamb"
        >
          <ApiChart type="tamb" />
        </ApiChartContainer>
      </ChartGridItem>
    </ChartGrid>
  );
};

export default TemperatureChartsPage;
