import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store/store';
import { IAppState } from './store/reducers';

interface IRoot {
  store: Store<IAppState>;
}

const Root: React.FC<IRoot> = props => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.querySelector(
  '#root'
) as HTMLElement);
