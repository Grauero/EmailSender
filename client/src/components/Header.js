import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUser } from '../store/actions';

const Header = ({ auth }) => {
  function renderContent() {
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
            <a href=" ">Logout</a>
          </li>
        );
    }
  }

  return (
    <nav>
      <div className="naw-wrapper">
        <a href=" " className="left brand-logo">
          Email Sender
        </a>
        <ul className="right">{renderContent()}</ul>
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
