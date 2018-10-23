import React from 'react';
import { storiesOf } from '@storybook/react';

import Tabs, { Tab } from './index';

storiesOf('Tabs', module)
  .add('Basic', () => (
    <Tabs>
      <Tab active>Sencors</Tab>
      <Tab>Switches</Tab>
      <Tab>Pumps</Tab>
    </Tabs>
  ));
