import React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from '../Typography';
import Spacing from './index';

storiesOf('Spacing', module)
  .add('Basic', () => (
    <div>
      <Spacing marginBottom>
        <Typography>
          Hello world!
        </Typography>
      </Spacing>
      <Spacing marginLeft={2}>
        <Typography>
          Hello world!
        </Typography>
      </Spacing>
      <Spacing padding={1}>
        <Typography>
          Hello world!
        </Typography>
      </Spacing>
    </div>
  ));
