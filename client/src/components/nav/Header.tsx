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
  }

  return (
    <li>
      <a href="/auth/google" className="auth">
        Login With Google
      </a>
    </li>
  );
}

export interface IHeader {
  auth: AuthState;
}

const Header: React.FC<IHeader> = props => {
  const { auth } = props;

  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to={auth ? '/surveys' : '/'} className="logo">
          <i className="material-icons left">email</i>
          <h2>EmailSender</h2>
        </Link>
        <ul>{renderContent(auth)}</ul>
      </div>
    </nav>
  );
};

export const mapStateToProps = (state: IAppState) => ({
  auth: state.auth
});

export { Header };
export default connect(mapStateToProps)(Header);
