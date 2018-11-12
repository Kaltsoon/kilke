import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';

import ReactorGrid, { ReactorGridItem } from './index';
import ReactorComponent from '../ReactorComponent';
import ReactorComponentStatus from '../ReactorComponentStatus';
import PumpReactorComponentInfo from '../PumpReactorComponentInfo';

storiesOf('ReactorGrid', module).add('Basic', () => (
  <ReactorGrid>
    <ReactorGridItem actions={<Button color="primary">Configure</Button>}>
      <ReactorComponent
        icon={<ReactorComponentStatus status="online" type="p" />}
      >
        <PumpReactorComponentInfo name="Pump" rpm={2.3} status="online" />
      </ReactorComponent>
    </ReactorGridItem>
  </ReactorGrid>
));
