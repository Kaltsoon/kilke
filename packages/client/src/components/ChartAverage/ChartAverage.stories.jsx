import React from 'react';
import { storiesOf } from '@storybook/react';

import ChartAverage from './index';

storiesOf('ChartAverage', module)
  .add('Basic', () => (
    <ChartAverage current={5.56} previous={5.02} timespan={300000} unit="rpm" />
  ));
