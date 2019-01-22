import { FETCH_USER } from '../types';

const initialState: null | boolean | object = null;

interface Action {
  type: string;
  payload: any;
}

export default function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
