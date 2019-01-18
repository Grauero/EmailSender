import React, { Component, lazy, Suspense } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import Spinner from '../utils/Spinner';

const SurveyFormReview = lazy(() => import('./SurveyFormReview'));

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent = () => {
    if (this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  };

  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <div>{this.renderContent()}</div>
      </Suspense>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
