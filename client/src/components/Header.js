import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUser } from '../store/actions';

const Header = ({ auth }) => {
  function renderControls() {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  const logoURL = auth ? '/surveys' : '';

  return (
    <nav>
      <div className="naw-wrapper">
        <Link to={logoURL} className="left brand-logo">
          Email Sender
        </Link>
        <ul className="right">{renderControls()}</ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);