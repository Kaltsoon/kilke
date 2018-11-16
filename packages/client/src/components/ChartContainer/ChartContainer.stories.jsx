import React from 'react';
import { storiesOf } from '@storybook/react';

import ChartContainer from './index';
import Chart from '../Chart';

const now = new Date();

const options = {
  chart: {
    type: 'spline',
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Time',
    },
  },
  series: [
    {
      name: 'Values',
      data: [
        [now.getTime(), 2],
        [new Date(+now + 1000).getTime(), 3],
        [new Date(+now + 2000).getTime(), 4],
      ],
    },
  ],
};

const chart = <Chart options={options} />;

storiesOf('ChartContainer', module).add('Basic', () => (
  <ChartContainer title="Lorem ipsum">{chart}</ChartContainer>
));
