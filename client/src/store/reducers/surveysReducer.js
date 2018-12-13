import { FETCH_SURVEYS } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
