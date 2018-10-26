import React from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';

import ApiChartContainer from '../ApiChartContainer';
import ApiChart from '../ApiChart';

const WeightChartsPage = () => {
  return (
    <ChartGrid>
      <ChartGridItem>
        <ApiChartContainer
          title="Feed weight"
          type="wf"
        >
          <ApiChart type="wf" />
        </ApiChartContainer>
      </ChartGridItem>

      <ChartGridItem>
        <ApiChartContainer
          title="Draw weight"
          type="wd"
        >
          <ApiChart type="wd" />
        </ApiChartContainer>
      </ChartGridItem>
    </ChartGrid>
  );
};

export default WeightChartsPage;
