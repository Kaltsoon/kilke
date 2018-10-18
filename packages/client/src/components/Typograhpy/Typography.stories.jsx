import React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from './index';

storiesOf('Typography', module)
  .add('Basic', () => (
    <Typography>
      Hello world!
    </Typography>
  ))
  .add('Variant', () => (
    <div>
      <Typography variant="paragraph">
        Hello world!
      </Typography>
      <Typography variant="secondary">
        Hello world!
      </Typography>
    </div>
  ));
