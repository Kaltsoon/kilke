import React from 'react';
import { storiesOf } from '@storybook/react';

import Chart from './index';

const options = {
  series: [
    {
      name: 'Values',
      data: [[1, 2], [2, 3], [3, 4]],
    },
  ],
};

storiesOf('Chart', module).add('Basic', () => <Chart options={options} />);
