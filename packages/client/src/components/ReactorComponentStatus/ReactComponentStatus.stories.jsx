import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactorComponentStatus from './index';

storiesOf('ReactorComponentStatus', module).add('Basic', () => (
  <div>
    <ReactorComponentStatus status="manual">pH</ReactorComponentStatus>
    <ReactorComponentStatus status="automatic">T</ReactorComponentStatus>
    <ReactorComponentStatus status="fault">pH</ReactorComponentStatus>
    <ReactorComponentStatus status="off">pH</ReactorComponentStatus>
  </div>
));
