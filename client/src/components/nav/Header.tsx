import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from '../utils/Payments';
import { IAppState } from '../../store/reducers';
import { AuthState } from '../../store/reducers/authReducer';

function renderContent(auth: AuthState) {
  if (auth instanceof Object) {
    return [
      <li key="1">
        <Payments />
      </li>,
      <li key="2" style={{ margin: '0 10px' }}>
        Credits: {auth.credits}
      </li>,
      <li key="3">
        <a href="/auth/logout">Logout</a>
      </li>
    ];
  } else if (!auth) {
    return (
      <li>
        <a href="/auth/google">Login With Google</a>
      </li>
    );
  }

  return;
}

export interface IHeader {
  auth: AuthState;
}

const Header: React.FC<IHeader> = props => {
  const { auth } = props;

  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={auth ? '/surveys' : '/'}
          className="left brand-logo"
          style={{ marginLeft: '10px' }}
        >
          <i className="material-icons left">email</i>EmailSender
        </Link>
        <ul className="right">{renderContent(auth)}</ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: IAppState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
