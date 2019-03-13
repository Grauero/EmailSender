import { combineReducers } from 'redux';
import { reducer as reduxForm, FormStateMap } from 'redux-form';

import { authReducer, AuthState } from './authReducer';
import { surveysReducer, SurveyState } from './surveysReducer';

export interface IAppState {
  auth: AuthState;
  surveys: SurveyState;
  form: FormStateMap;
}

export const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm
});
