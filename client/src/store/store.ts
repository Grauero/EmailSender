import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer, IAppState } from './reducers';

const initialState = {};
const middleware = [thunk];

export default function configureStore(): Store<IAppState, any> {
  const w = window as any;
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      w.__REDUX_DEVTOOLS_EXTENSION__ &&
      w.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
}
