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
              pH
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
              Redox
            </Fragment>
          }
          type="phd"
          calibratable
        >
          <ApiChart type="phd" />
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

export default PhChartsPage;
