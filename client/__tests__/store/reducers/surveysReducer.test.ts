import 'jest';

import { ActionTypes, SurveyAction } from '../../../src/store/types';
import { surveysReducer } from '../../../src/store/reducers/surveysReducer';

const initialState = [];

test('sets initial state as [], if state isnt provided', () => {
  const res = surveysReducer(undefined, 'UNKNOWN_ACTION');

  expect(res).toEqual([]);
});

test('returns initial state if fails to proceed action', () => {
  const res = surveysReducer(initialState, 'UNKNOWN_ACTION');

  expect(res).toEqual(initialState);
});

describe(`${ActionTypes.FETCH_SURVEYS}`, () => {
  test('returns action.payload if payload is truthy value', () => {
    const action: SurveyAction = {
      type: ActionTypes.FETCH_SURVEYS,
      payload: []
    };
    const res = surveysReducer(initialState, action);

    expect(res).toBeTruthy();
    expect(res).toEqual(action.payload);
  });

  test('returns false if payload is falsy value', () => {
    const action: SurveyAction = {
      type: ActionTypes.FETCH_SURVEYS,
      payload: false
    };
    const res = surveysReducer(initialState, action);

    expect(res).toBeFalsy();
    expect(res).toBe(false);
  });
});
