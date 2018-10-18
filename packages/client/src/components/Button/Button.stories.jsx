import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Button from './index';

storiesOf('Button', module)
  .add('Basic', () => (
    <Button>
      Button
    </Button>
  ))
  .add('Color', () => (
    <Fragment>
      <Button color="primary">
        Primary
      </Button>
      <Button color="success">
        Success
      </Button>
      <Button color="danger">
        Danger
      </Button>
    </Fragment>
  ))
  .add('Variant', () => (
    <Fragment>
      <Button variant="solid">
        Solid
      </Button>
      <Button variant="outline">
        Outline
      </Button>
    </Fragment>
  ))
  .add('Disabled', () => (
    <Fragment>
      <Button disabled>
        Disabled
      </Button>
    </Fragment>
  ))
  .add('Icon', () => (
    <Fragment>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button icon="create" variant="outline" />
        <Button iconBefore="create">
          Edit
        </Button>
        <Button color="success" iconBefore="add">
          Create
        </Button>
      </div>
    </Fragment>
  ));
