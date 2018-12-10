import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => (
  <div>
    <label>{label}</label>
    <input {...input} style={{ marginBottom: '5px' }} />
    {touched && error}
  </div>
);

export default SurveyField;
