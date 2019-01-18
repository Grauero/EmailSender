import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  const inputStyles = { marginBottom: '5px' };
  const divStyles = { marginBottom: '20px' };

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={inputStyles} />
      <div className="red-text" style={divStyles}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
