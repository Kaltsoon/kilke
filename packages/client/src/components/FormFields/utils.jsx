import React, { createElement, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

const generateId = prefix =>
  `${prefix}__${Math.round(Math.random() * 100000).toString()}`;

export const createComponent = (Component, mapProps) => {
  const InputComponent = props => {
    const idRef = useRef();

    if (!idRef.current) {
      idRef.current = generateId('FormField');
    }

    const { disabled, inputLabel, label, helperText, meta } = props;
    const hasError = !!meta.error;
    const showError = hasError && meta.touched;
    const id = props.id || idRef.current;

    const children = createElement(Component, mapProps({ id, ...props }));

    return (
      <FormControl error={showError} disabled={disabled} fullWidth>
        {label ? <FormLabel htmlFor={id}>{label}</FormLabel> : null}
        {inputLabel ? <InputLabel htmlFor={id}>{inputLabel}</InputLabel> : null}
        {children}
        {helperText || showError ? (
          <FormHelperText>{showError ? meta.error : helperText}</FormHelperText>
        ) : null}
      </FormControl>
    );
  };

  InputComponent.displayName = `FormField${Component.name}`;

  return InputComponent;
};
