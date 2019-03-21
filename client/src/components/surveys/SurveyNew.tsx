import React, { Component, lazy, Suspense } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import SurveyForm from './SurveyForm';
import Spinner from '../utils/Spinner';

const SurveyFormReview = lazy(() => import('./SurveyFormReview'));

export interface ISurveyNewState {
  showFormReview: boolean;
}

class SurveyNew extends Component<InjectedFormProps<{}>, ISurveyNewState> {
  public state = {
    showFormReview: false
  };

  public renderContent = () => {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          {...{ onCancel: () => this.setState({ showFormReview: false }) }}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  };

  public render() {
    return (
      <Suspense fallback={<Spinner />}>
        <div className="container new-survey">{this.renderContent()}</div>
      </Suspense>
    );
  }
}

export { SurveyNew };
export default reduxForm<{}, {}>({
  form: 'surveyForm'
})(SurveyNew);
