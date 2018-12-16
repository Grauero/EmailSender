const modalStyles = {
  zIndex: '10000',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  textAlign: 'center'
};

const messageStyles = {
  zIndex: '10000',
  backgroundColor: 'rgba(255, 255, 255, .9)',
  width: '50%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '15em auto',
  marginLeft: '20%',
  marginRight: '20%',
  borderRadius: '50px'
};

const paragraphStyles = {
  zIndex: '10000',
  paddingTop: '10px',
  fontSize: '1.5em'
};

const buttonStyles = {
  zIndex: '10000',
  margin: '3em 5%'
};

export default {
  modalStyles,
  messageStyles,
  paragraphStyles,
  buttonStyles
};
