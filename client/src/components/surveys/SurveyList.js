import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../store/actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys = () =>
    this.props.surveys.reverse().map(survey => (
      <div className="card darken-1" key={survey._id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
        <div className="card-action">
          <a href=" ">Yes: {survey.yes}</a>
          <a href=" ">No: {survey.no}</a>
        </div>
      </div>
    ));

  render() {
    return <div>{this.renderSurveys()}</div>;
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
