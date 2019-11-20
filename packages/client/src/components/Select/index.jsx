import React, { forwardRef, useRef, useEffect, useState } from 'react';
import MuiSelect from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import useId from '@/hooks/useId';

const Select = forwardRef(
  (
    {
      variant = 'outlined',
      helperText,
      label,
      fullWidth = true,
      error = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const labelId = useId('label');
    const inputLabel = useRef(null);

    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
      if (inputLabel.current) {
        setLabelWidth(inputLabel.current.offsetWidth);
      }
    }, []);

    return (
      <FormControl
        variant={variant}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {label ? (
          <InputLabel ref={inputLabel} id={labelId}>
            {label}
          </InputLabel>
        ) : null}
        <MuiSelect
          labelId={labelId}
          labelWidth={labelWidth}
          fullWidth
          {...props}
          ref={ref}
        />
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    );
  },
);

export default Select;
