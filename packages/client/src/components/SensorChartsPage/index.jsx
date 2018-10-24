import React from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';

import ApiChartContainer from '../ApiChartContainer';
import ApiChart from '../ApiChart';

const options = {
  chart: {
    type: 'areaspline'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Time',
    },
  },
};

const ChartsPage = () => {
  return (
    <ChartGrid>
      <ChartGridItem>
        <ApiChartContainer title="CON" type="con">
          <ApiChart options={options} type="con" />
        </ApiChartContainer>
      </ChartGridItem>
      <ChartGridItem>
        <ApiChartContainer title="TCO" type="tco">
          <ApiChart options={options} type="tco" />
        </ApiChartContainer>
      </ChartGridItem>
    </ChartGrid>
  );
};

export default ChartsPage;
