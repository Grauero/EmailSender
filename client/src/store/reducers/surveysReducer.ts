import { Reducer } from 'redux';
import { ActionTypes, SurveyAction } from '../types';

export type SurveyState = any[] | boolean;

export const surveysReducer: Reducer<SurveyState, SurveyAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SURVEYS:
      return action.payload || false;
    default:
      return state;
  }
};
