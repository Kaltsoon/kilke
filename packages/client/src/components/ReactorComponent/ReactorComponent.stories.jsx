import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactorComponent from './index';
import ReactorComponentStatus from '../ReactorComponentStatus';
import PumpReactorComponentInfo from '../PumpReactorComponentInfo';

storiesOf('ReactorComponent', module).add('Basic', () => (
  <div>
    <ReactorComponent
      icon={<ReactorComponentStatus status="online" variant="pump" />}
    >
      <PumpReactorComponentInfo name="Pump" rpm={2.3} status="online" />
    </ReactorComponent>
  </div>
));
