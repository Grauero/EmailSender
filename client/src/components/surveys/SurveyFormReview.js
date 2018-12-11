import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import { submitSurvey } from '../../store/actions';

const SurveyFormReview = ({
  history, formValues, onCancel, submitSurvey
}) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Confirm your entries</h5>
      {reviewFields}
      <button type="button" className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        type="button"
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

SurveyFormReview.propTypes = {
  formValues: PropTypes.instanceOf(Object).isRequired,
  onCancel: PropTypes.func.isRequired,
  submitSurvey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
