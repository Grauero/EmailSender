import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

const Header = ({ auth }) => {
  function renderContent() {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="http://localhost:5000/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">
            <a href="http://localhost:5000/auth/logout">Logout</a>
          </li>
        ];
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
          Emaily
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
