import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ActionTypes, AuthAction, SurveyAction } from '../types';
import { AuthState } from '../reducers/authReducer';
import { SurveyState } from '../reducers/surveysReducer';

export const fetchUser: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
> = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export const handleToken: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
> = token => async (dispatch: Dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export const submitSurvey: ActionCreator<
  ThunkAction<Promise<any>, AuthState, null, AuthAction>
> = (values, history) => async (dispatch: Dispatch) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');

  dispatch({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export const fetchSurveys: ActionCreator<
  ThunkAction<Promise<any>, SurveyState, null, SurveyAction>
> = () => async (dispatch: Dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({
    type: ActionTypes.FETCH_SURVEYS,
    payload: res.data
  });
};

export const deleteSurvey: ActionCreator<
  ThunkAction<Promise<any>, SurveyState, null, SurveyAction>
> = id => async (dispatch: Dispatch) => {
  const res = await axios.delete(`/api/surveys/${id}`);

  dispatch({
    type: ActionTypes.FETCH_SURVEYS,
    payload: res.data
  });
};
