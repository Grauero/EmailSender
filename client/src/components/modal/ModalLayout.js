import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSurveys, deleteSurvey } from '../../store/actions';
import styles from './modalStyles';

const ModalLayout = props => {
  const { id, toggleModal, fetchSurveys, deleteSurvey } = props;

  const handleClick = e => e.stopPropagation();
  const handleButtonClick = () => {
    deleteSurvey(id);
    fetchSurveys();
    toggleModal();
  };

  return (
    <div style={styles.modalStyles} onClick={toggleModal}>
      <div style={styles.messageStyles} onClick={handleClick}>
        <p style={styles.paragraphStyles}>
          You sure You want to DELETE survey?
        </p>
        <button
          type="button"
          className="red btn white-text"
          style={styles.buttonStyles}
          onClick={handleButtonClick}
        >
          Yes
        </button>
        <button
          className="teal btn-flat white-text"
          type="button"
          style={styles.buttonStyles}
          onClick={toggleModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { fetchSurveys, deleteSurvey }
)(ModalLayout);
