import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../utils/validateEmails';
import { formFields, IFormField } from './formFields';

export interface IError {
  recipients: string | null;
}

export interface ISurveyForm {
  handleSubmit?: () => void;
  onSurveySubmit: () => void;
}

const SurveyForm: React.FC<InjectedFormProps<{}> & ISurveyForm> = props => {
  const { handleSubmit, onSurveySubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields(formFields)}
        <Link to="/surveys" className="red btn-flat white-text form-back">
          Cancel
        </Link>
        <button
          type="submit"
          className="teal btn-flat right white-text form-submit"
        >
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

export function renderFields(formFields: IFormField[]) {
  return formFields.map(({ label, name }) => (
    <Field
      key={name}
      component={SurveyField}
      type="text"
      label={label}
      name={name}
    />
  ));
}

export function validate(values, formFields) {
  const errors: IError = { recipients: null };
  errors.recipients = validateEmails(values.recipients);

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export { SurveyForm };
export default reduxForm<{}, ISurveyForm>({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
