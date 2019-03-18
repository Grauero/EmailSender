import 'jest';

import {
  fetchUser,
  handleToken,
  submitSurvey,
  fetchSurveys,
  deleteSurvey
} from '../../../src/store/actions';
import { ActionTypes } from '../../../src/store/types';
import { mock, store } from '../../../mocks/testConfig';

beforeEach(() =>
  mock.onAny(/\.*/).reply(() => {
    return new Promise((resolve, reject) => resolve([200, 'test']));
  })
);

afterEach(() => {
  mock.reset();
  store.clearActions();
});

describe('fetchUser', () => {
  const route = '/api/current_user';

  test(`makes GET request to ${route}`, async () => {
    await store.dispatch(fetchUser());

    expect(mock.history.get[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    await store.dispatch(fetchUser());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('handleToken', () => {
  const route = '/api/stripe';

  test(`makes POST request to ${route}`, async () => {
    await store.dispatch(handleToken('token'));

    expect(mock.history.post[0].url).toBe(`${route}`);
    expect(mock.history.post[0].data).toBe('token');
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    await store.dispatch(handleToken());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('submitSurvey', () => {
  const route = '/api/surveys';
  const args = { values: 'values', history: { push: jest.fn() } };

  test(`makes POST request to ${route}`, async () => {
    await store.dispatch(submitSurvey(args.values, args.history));

    expect(mock.history.post[0].url).toBe(`${route}`);
    expect(mock.history.post[0].data).toBe(args.values);
  });

  test(`redirects user to /surveys`, async () => {
    await store.dispatch(submitSurvey(args.values, args.history));

    expect(args.history.push).toHaveBeenCalled();
    expect(args.history.push).toHaveBeenCalledWith('/surveys');
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    await store.dispatch(submitSurvey(args.values, args.history));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('fetchSurveys', () => {
  const route = '/api/surveys';

  test(`makes GET request to ${route}`, async () => {
    await store.dispatch(fetchSurveys());

    expect(mock.history.get[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_SURVEYS} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_SURVEYS, payload: 'test' };
    await store.dispatch(fetchSurveys());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('deleteSurvey', () => {
  const surveyId = 'test';
  const route = `/api/surveys/${surveyId}`;

  test(`makes DELETE request to ${route}`, async () => {
    await store.dispatch(deleteSurvey(surveyId));

    expect(mock.history.delete[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_SURVEYS} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_SURVEYS, payload: 'test' };
    await store.dispatch(deleteSurvey(surveyId));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
