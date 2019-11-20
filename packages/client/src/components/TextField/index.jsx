import React, { forwardRef } from 'react';
import MuiTextField from '@material-ui/core/TextField';

const TextField = forwardRef(
  ({ variant = 'outlined', fullWidth = true, ...props }, ref) => {
    return (
      <MuiTextField
        variant={variant}
        fullWidth={fullWidth}
        ref={ref}
        {...props}
      />
    );
  },
);

export default TextField;
