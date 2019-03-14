import React from 'react';

export interface ISurveyField {
  input: object;
  label: string;
  meta: {
    error: string;
    touched: boolean;
  };
}

const SurveyField: React.FC<ISurveyField> = props => {
  const {
    input,
    label,
    meta: { error, touched }
  } = props;

  return (
    <div>
      <label>{label}</label>
      <input {...input} className="input" />
      <div className="red-text touched">{touched && error}</div>
    </div>
  );
};

export default SurveyField;
