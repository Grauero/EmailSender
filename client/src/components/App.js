import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';

const App = () => (
  <Provider store={store}>
    <div>123</div>
  </Provider>
);

export default App;
