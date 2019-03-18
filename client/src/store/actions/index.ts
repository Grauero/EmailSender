import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ActionTypes, AuthAction, SurveyAction } from '../types';
import { AuthState } from '../reducers/authReducer';
import { SurveyState } from '../reducers/surveysReducer';

export type IfetchUser = ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
>;
export const fetchUser: IfetchUser = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export type IhandleToken = ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
>;
export const handleToken: IhandleToken = token => async (
  dispatch: Dispatch
) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export type IsubmitSurvey = ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
>;
export const submitSurvey: IsubmitSurvey = (values, history) => async (
  dispatch: Dispatch
) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export type IfetchSurvey = ActionCreator<
  ThunkAction<Promise<any>, SurveyState, null, SurveyAction>
>;
export const fetchSurveys: IfetchSurvey = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({
    type: ActionTypes.FETCH_SURVEYS,
    payload: res.data
  });
};

export type IdeleteSurvey = ActionCreator<
  ThunkAction<Promise<any>, SurveyState, null, SurveyAction>
>;
export const deleteSurvey: IdeleteSurvey = id => async (dispatch: Dispatch) => {
  const res = await axios.delete(`/api/surveys/${id}`);

  dispatch({
    type: ActionTypes.FETCH_SURVEYS,
    payload: res.data
  });
};
