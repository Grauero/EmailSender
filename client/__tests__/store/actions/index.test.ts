import 'jest';

import * as actionCreators from '../../../src/store/actions';
import { ActionTypes } from '../../../src/store/types';
import { mock, store } from '../../../mocks/testConfig';

afterEach(() => {
  mock.reset();
  store.clearActions();
});

describe('fetchUser', () => {
  const route = '/api/current_user';

  beforeEach(() =>
    mock.onGet(`${route}`).reply(() => {
      return new Promise((resolve, reject) => resolve([200, 'test']));
    })
  );

  test(`makes GET request to ${route}`, async () => {
    await store.dispatch(actionCreators.fetchUser());

    expect(mock.history.get[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    await store.dispatch(actionCreators.fetchUser());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('handleToken', () => {
  const route = '/api/stripe';

  beforeEach(() =>
    mock.onPost(`${route}`).reply(() => {
      return new Promise((resolve, reject) => resolve([200, 'test']));
    })
  );

  test(`makes POST request to ${route}`, async () => {
    await store.dispatch(actionCreators.handleToken('token'));

    expect(mock.history.post[0].url).toBe(`${route}`);
    expect(mock.history.post[0].data).toBe('token');
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    await store.dispatch(actionCreators.handleToken());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('submitSurvey', () => {
  const route = '/api/surveys';

  beforeEach(() =>
    mock.onPost(`${route}`).reply(() => {
      return new Promise((resolve, reject) => resolve([200, 'test']));
    })
  );

  test(`makes POST request to ${route}`, async () => {
    const args = { values: 'values', history: { push: jest.fn() } };
    await store.dispatch(
      actionCreators.submitSurvey(args.values, args.history)
    );

    expect(mock.history.post[0].url).toBe(`${route}`);
    expect(mock.history.post[0].data).toBe(args.values);
  });

  test(`redirects user to /surveys`, async () => {
    const args = { values: 'values', history: { push: jest.fn() } };
    await store.dispatch(
      actionCreators.submitSurvey(args.values, args.history)
    );

    expect(args.history.push).toHaveBeenCalled();
    expect(args.history.push).toHaveBeenCalledWith('/surveys');
  });

  test(`dispatches ${ActionTypes.FETCH_USER} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_USER, payload: 'test' };
    const args = { values: 'values', history: { push: jest.fn() } };
    await store.dispatch(
      actionCreators.submitSurvey(args.values, args.history)
    );

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('fetchSurveys', () => {
  const route = '/api/surveys';

  beforeEach(() =>
    mock.onGet(`${route}`).reply(() => {
      return new Promise((resolve, reject) => resolve([200, 'test']));
    })
  );

  test(`makes GET request to ${route}`, async () => {
    await store.dispatch(actionCreators.fetchSurveys());

    expect(mock.history.get[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_SURVEYS} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_SURVEYS, payload: 'test' };
    await store.dispatch(actionCreators.fetchSurveys());

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});

describe('deleteSurvey', () => {
  const surveyId = 'test';
  const route = `/api/surveys/${surveyId}`;

  beforeEach(() =>
    mock.onDelete(`${route}`).reply(() => {
      return new Promise((resolve, reject) => resolve([200, 'test']));
    })
  );

  test(`makes DELETE request to ${route}`, async () => {
    await store.dispatch(actionCreators.deleteSurvey(surveyId));

    expect(mock.history.delete[0].url).toBe(`${route}`);
  });

  test(`dispatches ${ActionTypes.FETCH_SURVEYS} action`, async () => {
    const expectedAction = { type: ActionTypes.FETCH_SURVEYS, payload: 'test' };
    await store.dispatch(actionCreators.deleteSurvey(surveyId));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
