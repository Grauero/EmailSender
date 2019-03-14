import React, { Component, lazy, Suspense } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../utils/Spinner';
import { fetchSurveys } from '../../store/actions';
import { IAppState } from '../../store/reducers';

const ModalLayout = lazy(() => import('../modal/ModalLayout'));

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface ISurveyListState {
  removingSurvey: string | null;
  modal: boolean;
}

class SurveyList extends Component<{} & ReduxProps, ISurveyListState> {
  public state = {
    removingSurvey: null,
    modal: false
  };

  public componentDidMount() {
    this.props.fetchSurveys();
  }

  private toggleModal = id => {
    this.setState({
      removingSurvey: id,
      modal: !this.state.modal
    });
  };

  private renderSurveys = () => {
    if (this.props.surveys instanceof Array) {
      return this.props.surveys.map(survey => (
        <div className="card survey-card" key={survey._id}>
          <i
            className="material-icons"
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
            onClick={() => this.toggleModal(survey._id)}
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
  };

  public render() {
    const modalLayout = this.state.modal ? (
      <ModalLayout
        id={this.state.removingSurvey}
        toggleModal={this.toggleModal}
      />
    ) : null;

    return (
      <div>
        <Suspense fallback={<Spinner />}>
          {modalLayout}
          {this.renderSurveys()}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  surveys: state.surveys
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ fetchSurveys }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
