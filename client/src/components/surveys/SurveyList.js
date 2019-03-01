import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../utils/Spinner';
import { fetchSurveys } from '../../store/actions';

const ModalLayout = lazy(() => import('../modal/ModalLayout'));

class SurveyList extends Component {
  state = {
    removingSurvey: null,
    modal: false
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  toggleModal = id => {
    this.setState({
      removingSurvey: id,
      modal: !this.state.modal
    });
  };

  renderSurveys = () =>
    this.props.surveys.map(survey => (
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

  render() {
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

SurveyList.propTypes = {
  surveys: PropTypes.instanceOf(Array).isRequired,
  fetchSurveys: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
