import React, { MouseEvent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSurveys, deleteSurvey } from '../../store/actions';
import styles from './modalStyles';

interface IModalLayout extends ReturnType<typeof mapDispatchToProps> {
  id: string;
  toggleModal: () => void;
}

const ModalLayout: React.FC<IModalLayout> = props => {
  const { id, toggleModal, fetchSurveys, deleteSurvey } = props;

  const handleClick = (e: MouseEvent) => e.stopPropagation();
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ fetchSurveys, deleteSurvey }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ModalLayout);
