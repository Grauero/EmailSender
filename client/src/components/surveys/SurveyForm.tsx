import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FormErrors, InjectedFormProps } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../utils/validateEmails';
import formFields from './formFields';

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
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

function renderFields() {
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

function validate(values) {
  const errors: IError = { recipients: null };
  errors.recipients = validateEmails(values.recipients);

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm<{}, ISurveyForm>({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
