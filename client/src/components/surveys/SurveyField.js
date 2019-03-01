import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => (
  <div>
    <label>{label}</label>
    <input {...input} className="input" />
    <div className="red-text touched">{touched && error}</div>
  </div>
);

export default SurveyField;
