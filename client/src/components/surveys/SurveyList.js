import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSurveys, deleteSurvey } from '../../store/actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys = () =>
    this.props.surveys.reverse().map(survey => (
      <div className="card" key={survey._id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <button type="button" onClick={() => this.props.deleteSurvey(survey._id)}>
            123
          </button>
          <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
        <div className="card-action row">
          <span
            className="green-text text-darken-2 col m12 l6"
            style={{ letterSpacing: '2px', marginTop: '10px', textAlign: 'center' }}
          >
            Number Of Positive Feedbacks:
            <span style={{ fontSize: '1.5em' }}> {survey.yes}</span>
          </span>
          <span
            className="red-text text-darken-3 col m12 l6"
            style={{ letterSpacing: '2px', marginTop: '10px', textAlign: 'center' }}
          >
            Number Of Negative Feedbacks:
            <span style={{ fontSize: '1.5em' }}> {survey.no}</span>
          </span>
        </div>
      </div>
    ));

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

SurveyList.propTypes = {
  surveys: PropTypes.instanceOf(Array).isRequired,
  fetchSurveys: PropTypes.func.isRequired,
  deleteSurvey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(SurveyList);
