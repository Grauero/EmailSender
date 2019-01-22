import { CSSProperties } from 'react';

const cardStyles: CSSProperties = {
  position: 'relative'
};
const closeStyles: CSSProperties = {
  position: 'absolute',
  right: 0,
  cursor: 'pointer'
};
const positiveFeedbackStyles: CSSProperties = {
  letterSpacing: '2px',
  marginTop: '10px',
  textAlign: 'center'
};
const negativeFeedbackStyles: CSSProperties = {
  letterSpacing: '2px',
  marginTop: '10px',
  textAlign: 'center'
};
const responseStyles: CSSProperties = {
  fontSize: '1.5em'
};

export default {
  cardStyles,
  closeStyles,
  positiveFeedbackStyles,
  negativeFeedbackStyles,
  responseStyles
};
