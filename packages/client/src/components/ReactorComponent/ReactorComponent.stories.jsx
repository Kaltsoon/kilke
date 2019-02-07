import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Icon from '@material-ui/core/Icon';
import ReactorComponent from './index';

storiesOf('ReactorComponent', module).add('Basic', () => (
  <div>
    <ReactorComponent
      onNameClick={action('nameClick')}
      onValueClick={action('valueClick')}
      onStatusClick={action('statusClick')}
      label={<Icon>play_arrow</Icon>}
      status="automatic"
      name="Pump"
      value="120 RPM"
    />
  </div>
));
