import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalLayout from '../modal/ModalLayout';
import { fetchSurveys } from '../../store/actions';

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
      <div className="card" key={survey._id} style={{ position: 'relative' }}>
        <i
          style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
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
    const modalLayout = this.state.modal ? (
      <ModalLayout id={this.state.removingSurvey} toggleModal={this.toggleModal} />
    ) : null;

    return (
      <div>
        {modalLayout}
        {this.renderSurveys()}
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
