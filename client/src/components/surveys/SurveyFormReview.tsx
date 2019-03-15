import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import { submitSurvey } from '../../store/actions';
import { IAppState } from '../../store/reducers';

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export interface ISurveyFormReview extends ReduxProps {
  onCancel: () => void;
  history: History;
}

const SurveyFormReview: React.FC<ISurveyFormReview> = props => {
  const { formValues, onCancel, submitSurvey, history } = props;

  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues ? formValues[name] : ''}</div>
    </div>
  ));

  return (
    <div className="preview">
      <h5>Confirm your entries</h5>
      {reviewFields}
      <button
        type="button"
        className="yellow darken-3 white-text btn-flat form-back"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        type="button"
        className="green btn-flat right white-text form-submit"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  formValues: state.form.surveyForm.values
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ submitSurvey }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyFormReview));
