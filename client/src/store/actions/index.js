import axios from 'axios';

import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from '../types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  console.log('fetch', res);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const loginUser = () => async (dispatch) => {
  const res = await axios.get('/auth/google');
  console.log('login', res);

  dispatch(fetchUser());
  // dispatch({
  //   type: LOGIN_USER,
  //   payload: res.data
  // });
};

export const logoutUser = () => async (dispatch) => {
  const res = await axios.get('/auth/logout');
  console.log('logout', res);

  dispatch({
    type: LOGOUT_USER
  });
};

export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
