import React, { Component, lazy, Suspense } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../utils/Spinner';
import { fetchSurveys, deleteSurvey } from '../../store/actions';
import { IAppState } from '../../store/reducers';

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class SurveyList extends Component<{} & ReduxProps, {}> {
  public componentDidMount() {
    this.props.fetchSurveys();
  }

  private renderSurveys = () => {
    if (this.props.surveys instanceof Array) {
      return this.props.surveys.map(survey => (
        <div className="card survey-card" key={survey._id}>
          <i
            className="material-icons"
            onClick={() => this.deleteSurvey(survey._id)}
          >
            close
          </i>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action row">
            <span className="green-text text-darken-2 col m12 l6 positive-response">
              Number Of Positive Feedbacks:
              <span className="response"> {survey.yes}</span>
            </span>
            <span className="red-text text-darken-3 col m12 l6 negative-response">
              Number Of Negative Feedbacks:
              <span className="response"> {survey.no}</span>
            </span>
          </div>
        </div>
      ));
    }

    return null;
  };

  private deleteSurvey = async id => {
    this.props.deleteSurvey(id);
    this.props.fetchSurveys();
  };

  public render() {
    return (
      <div className="cards">
        <Suspense fallback={<Spinner />}>{this.renderSurveys()}</Suspense>
      </div>
    );
  }
}

export const mapStateToProps = (state: IAppState) => ({
  surveys: state.surveys
});

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ fetchSurveys, deleteSurvey }, dispatch);
};

export { SurveyList };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
