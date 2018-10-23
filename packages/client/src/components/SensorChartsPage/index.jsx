import React from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';

import ChartContainer from '../ChartContainer';
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
        <ChartContainer title="Lorem ipsum">
          <ApiChart options={options} type="con" pollInterval={2000} />
        </ChartContainer>
      </ChartGridItem>
      <ChartGridItem>
        <ChartContainer title="Lorem ipsum">
          <ApiChart options={options} type="tco" pollInterval={2000} />
        </ChartContainer>
      </ChartGridItem>
    </ChartGrid>
  );
};

export default ChartsPage;
