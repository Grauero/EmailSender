import React, { CSSProperties } from 'react';

import spinner from './spinner.gif';

const Spinner = () => {
  const spinnerStyle: CSSProperties = {
    width: '100px',
    margin: 'auto',
    display: 'block'
  };

  return (
    <div>
      <img src={spinner} alt="Loading..." style={spinnerStyle} />
    </div>
  );
};

export default Spinner;
