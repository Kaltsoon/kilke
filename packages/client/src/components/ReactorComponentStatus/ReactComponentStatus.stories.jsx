import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactorComponentStatus from './index';

storiesOf('ReactorComponentStatus', module).add('Basic', () => (
  <div>
    <ReactorComponentStatus status="manual" variant="pump" />
    <ReactorComponentStatus status="automatic" variant="pump" />
    <ReactorComponentStatus status="fault" variant="pump" />
    <ReactorComponentStatus status="off" variant="pump" />
  </div>
));
