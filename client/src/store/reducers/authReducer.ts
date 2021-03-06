import { Reducer } from 'redux';
import { ActionTypes, AuthAction } from '../types';

export type AuthState = { googleId: string; credits: number } | boolean | null;

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
