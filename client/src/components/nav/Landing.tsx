import React, { CSSProperties } from 'react';

const Landing = () => {
  const style: CSSProperties = { textAlign: 'center' };

  return (
    <div style={style}>
      <h1>EmailSender</h1>
      Collect feedback from your users
    </div>
  );
};

export default Landing;
