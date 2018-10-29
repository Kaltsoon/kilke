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
  lifecycle,
  withProps,
} from 'recompose';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { submitCalibration } from '../../state/calibrations';
import CalibrationForm from '../CalibrationForm';

import {
  fetchLatestByType,
  selectLatestByType,
} from '../../state/calibrations';

const Form = reduxForm()(CalibrationForm);

const CalibrationModal = ({
  onClose,
  open,
  onOpen,
  type,
  children,
  onSubmit,
  form,
}) => {
  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Edit calibration</DialogTitle>
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
  withHandlers({
    onClose: ({ setOpen }) => () => {
      setOpen(false);
    },
    onOpen: ({ setOpen }) => () => {
      setOpen(true);
    },
  }),
  connect(
    (state, { type }) => ({
      calibration: selectLatestByType(state, type),
      loading: state.calibrations.latestByType[type] !== undefined
        ? state.calibrations.latestByType[type].loading
        : true,
    }),
    (dispatch, { type, onClose }) => ({
      onFetch: () => {
        dispatch(fetchLatestByType(type));
      },
      onSubmit: () => {
        dispatch(submitCalibration(type));
        onClose();
      },
    }),
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.type) {
        this.props.onFetch();
      }
    },
    componentDidUpdate({ type }) {
      if (this.props.type && type !== this.props.type) {
        this.props.onFetch();
      }
    },
  }),
  withProps(({ onSubmit, calibration, loading, type }) => {
    return {
      form: !loading ? (
        <Form
          form={`calibrationForm.${type}`}
          onSubmit={onSubmit}
          initialValues={calibration || {}}
        />
      ) : null,
    };
  }),
)(CalibrationModal);
