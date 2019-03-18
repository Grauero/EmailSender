import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

export const createMockStore = configureMockStore([thunk]);
export const store = createMockStore({});
export const mock = new MockAdapter(axios);