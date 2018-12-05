import { FETCH_USER } from '../types';

const initialState = null;

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
