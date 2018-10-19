import React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from './index';

storiesOf('Heading', module)
  .add('Basic', () => (
    <Heading>
      Hello world!
    </Heading>
  ))
  .add('Size', () => (
    <div>
      <Heading size={1}>
        Heading 1
      </Heading>
      <Heading size={2}>
        Heading 2
      </Heading>
      <Heading size={3}>
        Heading 3
      </Heading>
      <Heading size={4}>
        Heading 4
      </Heading>
    </div>
  ));
