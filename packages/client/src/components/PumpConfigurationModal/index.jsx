import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {
  compose,
  withState,
  withHandlers,
  withProps,
  branch,
  renderNothing,
  mapProps,
} from 'recompose';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import apiRefetch from '../apiRefetch';
import PumpConfigurationForm from '../PumpConfigurationForm';
import { submitConfiguration } from '../../state/pumps';

const getInitialValues = fetchValue => {
  return fetchValue
    ? {
        status: fetchValue.status,
        maxRpm: fetchValue.maxRpm,
        minRpm: fetchValue.minRpm,
        manualRpm: fetchValue.manualRpm,
      }
    : {};
};

const Form = compose(
  apiRefetch(props => ({
    configurationFetch: `/v1/pumps/${props.id}`,
  })),
  branch(({ configurationFetch }) => configurationFetch.pending, renderNothing),
  mapProps(props => ({
    ...props,
    initialValues: getInitialValues(props.configurationFetch.value),
  })),
  reduxForm(),
)(PumpConfigurationForm);

const PumpConfigurationModal = ({
  onClose,
  open,
  onOpen,
  children,
  onSubmit,
  form,
}) => {
  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Edit pump configuration</DialogTitle>
        <DialogContent>{form}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {children({
        onToggle: () => {
          open ? onClose() : onOpen();
        },
      })}
    </Fragment>
  );
};

export default compose(
  withState('open', 'setOpen', false),
  connect(
    null,
    (dispatch, { id, setOpen }) => ({
      onSubmit: () => {
        dispatch(submitConfiguration(id));
        setOpen(false);
      },
    }),
  ),
  withHandlers({
    onClose: ({ setOpen }) => () => {
      setOpen(false);
    },
    onOpen: ({ setOpen }) => () => {
      setOpen(true);
    },
  }),
  withProps(({ onSubmit, id }) => {
    return {
      form: (
        <Form
          id={id}
          form={`pumpConfigurationForm.${id}`}
          onSubmit={onSubmit}
        />
      ),
    };
  }),
)(PumpConfigurationModal);
