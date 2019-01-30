import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from '../utils/Payments';

const Header = ({ auth }) => {
  const creditsStyles = { margin: '0 10px' };
  const linkStyles = { marginLeft: '10px' };

  function renderContent() {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={creditsStyles}>
            Credits: {auth.credits}
          </li>,
          <li key="3">
            <a href="/auth/logout">Logout</a>
          </li>
        ];
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo" style={linkStyles}>
          <i className="material-icons left">email</i>EmailSender
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.bool])
};

Header.defaultProps = {
  auth: null
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);