import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../utils/Spinner';
import styles from './SurveyListStyles';
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

  toggleModal = (id) => {
    this.setState({
      removingSurvey: id,
      modal: !this.state.modal
    });
  };

  renderSurveys = () =>
    this.props.surveys.map(survey => (
      <div className="card" key={survey._id} style={styles.cardStyles}>
        <i
          style={styles.closeStyles}
          className="material-icons"
          onClick={() => this.toggleModal(survey._id)}
        >
          close
        </i>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
        <div className="card-action row">
          <span
            className="green-text text-darken-2 col m12 l6"
            style={styles.positiveFeedbackStyles}
          >
            Number Of Positive Feedbacks:
            <span style={styles.responseStyles}> {survey.yes}</span>
          </span>
          <span className="red-text text-darken-3 col m12 l6" style={styles.negativeFeedbackStyles}>
            Number Of Negative Feedbacks:
            <span style={styles.responseStyles}> {survey.no}</span>
          </span>
        </div>
      </div>
    ));

  render() {
    const modalLayout = this.state.modal ? (
      <ModalLayout id={this.state.removingSurvey} toggleModal={this.toggleModal} />
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
