import React from 'react';

import Sensors from './Sensors';

const ConfigForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Sensors />
    </form>
  );
};

export default ConfigForm;
