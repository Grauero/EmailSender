import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from '../types';

const initialState = {
  data: null,
  isAuthorized: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        data: action.payload,
        isAuthorized: true
      };
    case LOGIN_USER:
      return {
        isAuthorized: true
      };
    case LOGOUT_USER:
      return {
        data: null,
        isAuthorized: false
      };
    default:
      return state;
  }
}
