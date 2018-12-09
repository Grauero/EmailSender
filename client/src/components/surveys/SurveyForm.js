import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';

const SurveyForm = ({ handleSubmit }) => {
  const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
  ];

  function renderFields() {
    return FIELDS.map(({ label, name }) => (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    ));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values))}>
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

SurveyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
