import 'jest';

import { ActionTypes, AuthAction } from '../../../src/store/types';
import { authReducer } from '../../../src/store/reducers/authReducer';

const initialState = null;

test('sets initial state as null, if state isnt provided', () => {
  const res = authReducer(undefined, 'UNKNOWN_ACTION');

  expect(res).toBeNull();
});

test('returns initial state if fails to proceed action', () => {
  const res = authReducer(initialState, 'UNKNOWN_ACTION');

  expect(res).toBeNull();
  expect(res).toBe(initialState);
});

describe(`${ActionTypes.FETCH_USER}`, () => {
  test('returns action.payload if payload is truthy value', () => {
    const action: AuthAction = {
      type: ActionTypes.FETCH_USER,
      payload: { googleId: 'id', credits: 1 }
    };
    const res = authReducer(initialState, action);

    expect(res).toBeTruthy();
    expect(res).toEqual(action.payload);
  });

  test('returns false if payload is falsy value', () => {
    const action: AuthAction = {
      type: ActionTypes.FETCH_USER,
      payload: false
    };
    const res = authReducer(initialState, action);

    expect(res).toBeFalsy();
    expect(res).toBe(false);
  });
});
