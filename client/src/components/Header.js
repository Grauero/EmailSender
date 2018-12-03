import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser, logoutUser } from '../store/actions';
import Payments from './Payments';

const Header = ({ auth, loginUser, logoutUser }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  function renderControls() {
    if (auth.isAuthorized) {
      return [
        <li key="1">
          <Payments />
        </li>,
        <li key="2">
          <a onClick={e => handleLogout(e)} href="/auth/logout">
            Logout
          </a>
        </li>
      ];
    }

    return (
      <li>
        <a onClick={e => handleLogin(e)} href="/auth/google">
          Login With Google
        </a>
      </li>
    );
  }

  const logoURL = auth.isAuthorized ? '/surveys' : '';

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={logoURL} className="left brand-logo">
          EmailSender
        </Link>
        <ul className="right">{renderControls()}</ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, loginUser }
)(Header);
