import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSurveys, deleteSurvey } from '../../store/actions';
import styles from './modalStyles';

const ModalLayout = ({
  id, toggleModal, fetchSurveys, deleteSurvey
}) => (
  <div style={styles.modalStyles} onClick={toggleModal}>
    <div style={styles.messageStyles} onClick={e => e.stopPropagation()}>
      <p style={styles.paragraphStyles}>You sure You want to DELETE survey?</p>
      <button
        type="button"
        className="red btn white-text"
        style={styles.buttonStyles}
        onClick={() => {
          deleteSurvey(id);
          fetchSurveys();
          toggleModal();
        }}
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

ModalLayout.propTypes = {
  id: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchSurveys: PropTypes.func.isRequired,
  deleteSurvey: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchSurveys, deleteSurvey }
)(ModalLayout);
